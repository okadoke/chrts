import requests
import asyncio
import uvicorn
import urllib.parse
from fastai import *
from fastai.vision import *
from io import BytesIO
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse, JSONResponse
from starlette.staticfiles import StaticFiles

export_file_name = 'export.pkl'
path = Path(__file__).parent
learner = load_learner(path / 'models', export_file_name)
results = {'charts': 'chart', 'not_charts': 'not_chart'}

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=['X-Requested-With', 'Content-Type'])

# async def setup_learner():
#     # await download_file(export_file_url, path / export_file_name)
#     try:
#         learn = load_learner(path / 'models', export_file_name)
#         return learn
#     except RuntimeError as e:
#         if len(e.args) > 0 and 'CPU-only machine' in e.args[0]:
#             print(e)
#             message = "\n\nThis model was trained with an old version of fastai and will not work in a CPU environment.\n\nPlease update the fastai library in your training environment and export your model again.\n\nSee instructions for 'Returning to work' at https://course.fast.ai."
#             raise RuntimeError(message)
#         else:
#             raise


# loop = asyncio.get_event_loop()
# tasks = [asyncio.ensure_future(setup_learner())]
# learn = loop.run_until_complete(asyncio.gather(*tasks))[0]
# loop.close()

def predict(url):
  try:
    url_resp = requests.get(url, timeout=0.5)
    if url_resp.status_code != requests.codes.ok:
      return JSONResponse({'error': 'url_error', 'error_code': url_resp.status_code})
    if not 'Content-Type' in url_resp.headers:
      return JSONResponse({'error': 'url_error', 'msg': 'url response header does not contain a Content-Type'})
    if not 'image' in url_resp.headers['Content-Type']:
      return JSONResponse({'error': 'url_error', 'msg': 'url response Content-Type does not specify an image'})
  except requests.RequestException as err:
    return JSONResponse({'error': 'url_error', 'msg': "{0}".format(err)})

  try:
    img = open_image(io.BytesIO(url_resp.content))
    prediction = learner.predict(img)[0]
    return JSONResponse({'prediction': results[str(prediction)]})
  except Exception as err:
    return JSONResponse({'error': 'prediction_failed', 'msg': "{0}".format(err)})


@app.route('/ischart', methods=['GET'])
async def analyze(request):
  try:
    if not 'url' in request.query_params:
      return await catch_all(request)
    url = request.query_params['url']
    prediction_response = predict(urllib.parse.unquote(url))
    return prediction_response
  except Exception as err:
    return JSONResponse({'error': 'prediction_failed', 'msg': "{0}".format(err)})

@app.route('/*')
async def catch_all(request):
  return JSONResponse({'error': 'request_error', 'msg': 'Provide a url for the image to be analyzed using /ischart?url=<image_url>'})

if __name__ == '__main__':
    if 'serve' in sys.argv:
        uvicorn.run(app=app, host='0.0.0.0', port=5000, log_level="info")

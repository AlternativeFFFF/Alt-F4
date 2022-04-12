from PIL import Image
import os.path, sys

# Data from https://place.thatguyalex.com/  

src_path = "C:\\Users\\Rachel\\Documents\\Factorio\\rplace 2022\\raw\\images_quadro\\0"
dst_path = "C:\\Users\\Rachel\\Documents\\Factorio\\rplace 2022\\benchy"
dirs = os.listdir(src_path)

# Train
# tl = [353, 146]
# w = 307
# h = 97

# Gear
# tl = [446, 512]
# w = 300
# h = 100

# Benchy
tl = [138, 509]
w = 300
h = 100

br = [tl[0]+w, tl[1]+h]
size = (br[0]-tl[0], br[1]-tl[1])
upscale = 4

def crop():
    amount = len(dirs)
    print(f"Cropping {amount} images...")
    count = 0
    for item in dirs:
        fullsrc_path = os.path.join(src_path,item)
        if os.path.isfile(fullsrc_path):
            im = Image.open(fullsrc_path)
            f = os.path.splitext(fullsrc_path)[0].split("\\")[-1]
            imCrop = im.crop((tl[0], tl[1], br[0], br[1]))
            imCrop = imCrop.resize((size[0]*upscale, size[1]*upscale), resample=Image.NEAREST)
            imCrop.save(dst_path + "\\" + f + ".png", "PNG", quality=100)

        count +=1
        if count % 100 == 0:
            print(f"Progress: {int(count/amount*100)}%")

crop()
print("Done")
from PIL import Image
import os.path, sys

src_path = "C:\\Users\\Rachel\\Downloads\\images_single"
dst_path = "C:\\Users\\Rachel\\Downloads\\Cropped"
dirs = os.listdir(src_path)

tl = [234, 520]
br = [tl[0]+100, tl[1]+70]
size = (br[0]-tl[0], br[1]-tl[1])
upscale = 4

def crop():
    amount = len(dirs)
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
            print(f"Progress: {int(count/amount*100)}")

crop()
print("Done")
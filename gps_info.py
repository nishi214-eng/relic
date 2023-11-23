from PIL import Image
import PIL.ExifTags as ExifTags

def get_gps(fname):
    try:
        # open img files
        im = Image.open(fname)

        # Get exif information in dictionary form
        exif = {
            ExifTags.TAGS[k]: v
            for k, v in im._getexif().items()
            if k in ExifTags.TAGS
        }

        # get gps info
        gps_tags = exif["GPSInfo"]
        gps = {
            ExifTags.GPSTAGS.get(t, t): gps_tags[t]
            for t in gps_tags
        }

        # Get latitude and longitude information
        def conv_deg(v):
            # Converting fractions to degrees
            d = float(v[0])
            m = float(v[1])
            s = float(v[2])
            return d + (m / 60.0) + (s / 3600.0)

        lat = conv_deg(gps["GPSLatitude"])
        lat_ref = gps["GPSLatitudeRef"]
        if lat_ref != "N": lat = 0 - lat

        lon = conv_deg(gps["GPSLongitude"])
        lon_ref = gps["GPSLongitudeRef"]
        if lon_ref != "E": lon = 0 - lon


        return lat, lon
    except (AttributeError, KeyError, IndexError):
        # 位置情報がない場合
        raise ValueError("選択された画像には位置情報がありません。別の画像を選択してください。")

if __name__ == "__main__":
    try:
        lat, lon = get_gps("./img/IMG_6269.jpg")
        print(lat, lon)
    except:
        print("No GPS info")
import os
from lanzou.api import LanZouCloud

def parse_cookie(cookie_str):
    cookie_dict = {}
    for item in cookie_str.split(';'):
        item = item.strip()
        if '=' in item:
            key, *values = item.split('=')
            cookie_dict[key] = '='.join(values)
    return cookie_dict

def main():
    zip_path = os.getenv("ZIP_PATH")
    lanzou_cookie_str = os.getenv("LANZOU_COOKIE")
    folder_id = int(os.getenv("LANZOU_FOLDER_ID", "-1"))

    if not all([zip_path, lanzou_cookie_str]):
        raise ValueError("缺少必要的环境变量")

    lanzou_cookie = parse_cookie(lanzou_cookie_str)
    if 'ylogin' not in lanzou_cookie:
        raise ValueError("缺少 ylogin 字段")

    lzy = LanZouCloud()

    # 开启调试模式，打印登录请求的响应
    lzy.set_debug(True)  # 新增：打印详细请求信息

    login_result = lzy.login_by_cookie(lanzou_cookie)
    if not login_result:
        # 新增：打印登录失败的响应内容
        print("登录失败，蓝奏云返回信息：", lzy._last_resp.text)
        raise Exception("蓝奏云登录失败，可能是 Cookie 失效或格式错误")

    # 后续上传逻辑...
    print(f"开始上传文件：{zip_path}")
    upload_result = lzy.upload_file(zip_path, folder_id)
    if upload_result[0] != 0:
        raise Exception(f"上传失败：{upload_result[1]}")
    print(f"上传成功，文件ID：{upload_result[1]}")

if __name__ == "__main__":
    main()

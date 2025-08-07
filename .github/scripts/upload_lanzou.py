import os
from lanzou.api import LanZouCloud

def parse_cookie(cookie_str):
    """将 Cookie 字符串转换为字典"""
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
        raise ValueError("缺少必要的环境变量（ZIP_PATH 或 LANZOU_COOKIE）")

    lanzou_cookie = parse_cookie(lanzou_cookie_str)
    if 'ylogin' not in lanzou_cookie:
        raise ValueError("缺少 ylogin 字段，请检查 Cookie")

    lzy = LanZouCloud()

    # 旧版本库没有 set_debug 方法，注释掉这行
    # lzy.set_debug(True)

    login_result = lzy.login_by_cookie(lanzou_cookie)
    if not login_result:
        # 尝试获取登录失败的原因（旧版本可能没有 _last_resp 属性，这里做兼容处理）
        error_msg = "未知原因"
        if hasattr(lzy, '_last_resp'):
            error_msg = lzy._last_resp.text[:200]  # 只取前200字符避免过长
        raise Exception(f"蓝奏云登录失败，响应信息：{error_msg}")

    print(f"开始上传文件：{zip_path}")
    upload_result = lzy.upload_file(zip_path, folder_id)
    if upload_result[0] != 0:
        raise Exception(f"上传失败：{upload_result[1]}")
    print(f"上传成功，文件ID：{upload_result[1]}")

if __name__ == "__main__":
    main()

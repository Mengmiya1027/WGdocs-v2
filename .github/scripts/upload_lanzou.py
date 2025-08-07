import os
from lanzou.api import LanZouCloud
from lanzou.api.exceptions import LanZouError  # 引入异常处理（新版本特性）

def parse_cookie(cookie_str):
    """解析 Cookie 字符串为字典（库要求的格式）"""
    cookie_dict = {}
    for item in cookie_str.split(';'):
        item = item.strip()
        if '=' in item:
            key, *values = item.split('=')
            cookie_dict[key] = '='.join(values)
    return cookie_dict

def main():
    # 获取环境变量
    zip_path = os.getenv("ZIP_PATH")
    lanzou_cookie_str = os.getenv("LANZOU_COOKIE")
    folder_id = int(os.getenv("LANZOU_FOLDER_ID", "-1"))

    if not all([zip_path, lanzou_cookie_str]):
        raise ValueError("缺少必要的环境变量（ZIP_PATH 或 LANZOU_COOKIE）")

    # 解析 Cookie
    lanzou_cookie = parse_cookie(lanzou_cookie_str)
    if 'ylogin' not in lanzou_cookie:
        raise ValueError("Cookie 中缺少 ylogin 字段（库要求的必要字段）")

    # 初始化客户端（2024年版本构造方法无变化）
    lzy = LanZouCloud()

    try:
        # 登录（参考最新版本文档，login_by_cookie 仍为主要方式，但需确保 Cookie 完整）
        login_ok = lzy.login_by_cookie(lanzou_cookie)
        if not login_ok:
            # 新版本可通过 get_error() 获取具体错误（社区最新用法）
            raise LanZouError(f"登录失败，库返回错误：{lzy.get_error()}")

        print(f"登录成功，用户 ID: {lzy.uid}")

        # 上传文件（2024年版本上传方法增加了超时参数，优化稳定性）
        print(f"开始上传文件：{zip_path} 到文件夹 {folder_id}")
        err_code, file_info = lzy.upload_file(zip_path, folder_id, timeout=300)  # 5分钟超时

        if err_code != 0:
            raise LanZouError(f"上传失败，错误码 {err_code}：{lzy.get_error()}")

        print(f"上传成功！文件 ID: {file_info.id}, 下载链接: {file_info.url}")

    except LanZouError as e:
        raise Exception(f"蓝奏云操作失败：{str(e)}")
    except Exception as e:
        raise Exception(f"脚本运行异常：{str(e)}")

if __name__ == "__main__":
    main()

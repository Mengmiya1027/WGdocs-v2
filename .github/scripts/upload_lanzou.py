import os
from lanzou.api import LanZouCloud

def parse_cookie(cookie_str):
    """将 Cookie 字符串转换为字典"""
    cookie_dict = {}
    for item in cookie_str.split(';'):
        item = item.strip()
        if '=' in item:
            key, value = item.split('=', 1)
            cookie_dict[key] = value
    return cookie_dict

def main():
    # 从环境变量获取参数
    zip_path = os.getenv("ZIP_PATH")
    lanzou_cookie_str = os.getenv("LANZOU_COOKIE")
    folder_id = int(os.getenv("LANZOU_FOLDER_ID", "-1"))

    if not all([zip_path, lanzou_cookie_str]):
        raise ValueError("缺少必要的环境变量（ZIP_PATH 或 LANZOU_COOKIE）")

    # 解析 Cookie 字符串为字典
    lanzou_cookie = parse_cookie(lanzou_cookie_str)

    # 调试：打印解析后的 Cookie 所有键（仅打印键名，避免泄露值）
    print("解析后的 Cookie 包含以下键：", list(lanzou_cookie.keys()))

    # 检查是否包含 ylogin 字段
    if 'ylogin' not in lanzou_cookie:
        raise ValueError("Cookie 中缺少 ylogin 字段，请重新获取完整的蓝奏云 Cookie")

    # 初始化蓝奏云客户端
    lzy = LanZouCloud()

    # 使用解析后的 Cookie 字典登录
    login_result = lzy.login_by_cookie(lanzou_cookie)
    if not login_result:
        raise Exception("蓝奏云登录失败，请检查 Cookie 是否有效")

    # 上传文件
    print(f"开始上传文件：{zip_path} 到文件夹 ID：{folder_id}")
    upload_result = lzy.upload_file(zip_path, folder_id)

    if upload_result[0] != 0:
        raise Exception(f"文件上传失败，错误码：{upload_result[0]}，信息：{upload_result[1]}")

    print(f"文件上传成功，文件 ID：{upload_result[1]}")

if __name__ == "__main__":
    main()

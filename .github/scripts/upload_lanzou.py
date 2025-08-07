import os
from lanzou.api import LanZouCloud

def main():
    # 从环境变量获取参数
    zip_path = os.getenv("ZIP_PATH")
    lanzou_cookie = os.getenv("LANZOU_COOKIE")
    folder_id = int(os.getenv("LANZOU_FOLDER_ID"))

    if not all([zip_path, lanzou_cookie]):
        raise ValueError("缺少必要的环境变量（ZIP_PATH 或 LANZOU_COOKIE）")

    # 初始化蓝奏云客户端
    lzy = LanZouCloud()

    # 使用 Cookie 登录（v2.5.0+ 推荐方式）
    login_result = lzy.login_by_cookie(lanzou_cookie)
    if not login_result:
        raise Exception("蓝奏云登录失败，请检查 Cookie 是否有效")

    # 上传文件
    print(f"开始上传文件：{zip_path} 到文件夹 ID：{folder_id}")
    upload_result = lzy.upload_file(zip_path, folder_id)

    if upload_result[0] != 0:  # 0 表示成功（参考库的错误码机制）
        raise Exception(f"文件上传失败，错误码：{upload_result[0]}，信息：{upload_result[1]}")

    print(f"文件上传成功，文件 ID：{upload_result[1]}")

if __name__ == "__main__":
    main()
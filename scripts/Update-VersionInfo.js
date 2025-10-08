import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 解决ES模块中__dirname的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 文件路径配置
const MARKDOWN_PATH = path.resolve(__dirname, '../src/guide/new.md');
const JSON_OUTPUT_PATH = path.resolve(__dirname, '../src/public/assets/data/Version-Info.json');

// 辅助函数：输出带颜色的日志
const log = {
    info: (message) => console.log(`\x1b[34m[INFO] ${message}\x1b[0m`),
    success: (message) => console.log(`\x1b[32m[SUCCESS] ${message}\x1b[0m`),
    warning: (message) => console.log(`\x1b[33m[WARNING] ${message}\x1b[0m`),
    error: (message) => console.log(`\x1b[31m[ERROR] ${message}\x1b[0m`)
};

/**
 * 解析更新日期并转换格式
 * @param {string} dateStr 原始日期字符串（格式：最新更新：YYYY年MM月DD日）
 * @returns {string} 转换后的日期（格式：YYYY.MM.DD）
 */
function parseAndFormatDate(dateStr) {
    log.info(`开始解析日期: "${dateStr}"`);

    // 匹配"最新更新：YYYY年MM月DD日"格式
    const dateRegex = /最新更新：(\d{4})年(\d{1,2})月(\d{1,2})日/;
    const match = dateStr.match(dateRegex);

    if (!match) {
        throw new Error(`日期格式不正确，请使用"最新更新：YYYY年MM月DD日"格式`);
    }

    const year = match[1];
    const month = match[2].padStart(2, '0');
    const day = match[3].padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;

    log.info(`日期解析成功: ${dateStr} → ${formattedDate}`);
    return formattedDate;
}

/**
 * 解析 markdown 文件获取更新日志和版本信息
 * @returns {Object} 包含版本号、日期和日志内容的对象
 */
async function parseChangelogFromMarkdown() {
    try {
        log.info(`开始解析 markdown 文件: ${MARKDOWN_PATH}`);

        // 读取 markdown 文件内容
        const content = await fs.readFile(MARKDOWN_PATH, 'utf-8');
        const lines = content.split('\n');
        log.info(`成功读取 markdown 文件，共 ${lines.length} 行`);

        // 寻找开始标记 "::: tip"
        let startIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('::: tip')) {
                startIndex = i;
                break;
            }
        }

        if (startIndex === -1) {
            throw new Error('未找到开始标记 "::: tip"');
        }
        log.info(`找到开始标记 "::: tip"，位于第 ${startIndex + 1} 行`);

        // 提取并格式化更新日期
        const dateLine = lines[startIndex];
        const rawDate = dateLine.replace('::: tip ', '').trim();
        const formattedDate = parseAndFormatDate(rawDate);

        // 寻找结束标记 ":::"
        let endIndex = -1;
        for (let i = startIndex + 1; i < lines.length; i++) {
            if (lines[i].includes(':::')) {
                endIndex = i;
                break;
            }
        }

        if (endIndex === -1) {
            throw new Error('未找到结束标记 ":::"');
        }
        log.info(`找到结束标记 ":::"，位于第 ${endIndex + 1} 行`);

        // 检查结束标记行是否有其他信息
        const endLine = lines[endIndex].trim();
        if (endLine !== ':::') {
            throw new Error(`结束标记行含有不匹配的信息: "${endLine}"`);
        }

        // 提取更新日志内容行
        const changelogLines = lines.slice(startIndex + 1, endIndex);
        log.info(`提取到更新日志内容，共 ${changelogLines.length} 行`);

        // 提取版本号（支持"### WGdocs版本"和"### WGdocs双版本"两种格式）
        let version = null;
        let versionLineIndex = -1;
        const versionPatterns = [
            { prefix: '### WGdocs版本', type: '单版本' },
            { prefix: '### WGdocs双版本', type: '双版本' }
        ];

        for (let i = 0; i < changelogLines.length; i++) {
            const trimmedLine = changelogLines[i].trim();
            for (const pattern of versionPatterns) {
                if (trimmedLine.startsWith(pattern.prefix)) {
                    version = trimmedLine.replace(pattern.prefix, '').trim();
                    versionLineIndex = i;
                    log.info(`成功提取${pattern.type}版本号: ${version}`);
                    break;
                }
            }
            if (version) break;
        }

        if (!version) {
            throw new Error('未找到以 "### WGdocs版本" 或 "### WGdocs双版本" 开头的版本号信息');
        }

        // 过滤掉版本号所在行，确保content不包含版本号信息
        const contentWithoutVersion = changelogLines
            .filter((_, index) => index !== versionLineIndex)
            .join('\n')
            .trim();

        log.success('Markdown 文件解析完成');
        return {
            version,
            date: formattedDate,
            content: contentWithoutVersion
        };
    } catch (error) {
        log.error(`解析更新日志失败: ${error.message}`);
        throw error;
    }
}

/**
 * 将更新日志信息保存到 JSON 文件
 * @param {Object} changelog 解析得到的更新日志信息
 */
async function saveChangelogToJson(changelog) {
    try {
        log.info(`准备保存更新日志到: ${JSON_OUTPUT_PATH}`);

        // 确保输出目录存在
        const outputDir = path.dirname(JSON_OUTPUT_PATH);
        if (!fsSync.existsSync(outputDir)) {
            await fs.mkdir(outputDir, { recursive: true });
            log.info(`创建输出目录: ${outputDir}`);
        }

        // 读取现有数据（如果存在）
        let existingData = [];
        if (fsSync.existsSync(JSON_OUTPUT_PATH)) {
            try {
                const existingContent = await fs.readFile(JSON_OUTPUT_PATH, 'utf-8');
                if (existingContent.trim() !== '') {
                    existingData = JSON.parse(existingContent);
                    if (!Array.isArray(existingData)) {
                        throw new Error('JSON内容不是数组格式');
                    }
                    log.info(`读取到现有日志数据，共 ${existingData.length} 条记录`);
                } else {
                    log.warning('JSON文件为空，将创建新文件');
                    existingData = [];
                }
            } catch (jsonError) {
                log.warning(`JSON文件解析错误: ${jsonError.message}，将创建新文件`);
                existingData = [];
            }
        } else {
            log.info('未找到现有JSON文件，将创建新文件');
        }

        // 检查是否已存在该版本的日志
        const versionExists = existingData.some(item => item.version === changelog.version);
        let newData;

        if (versionExists) {
            newData = existingData.map(item =>
                item.version === changelog.version ? changelog : item
            );
            log.info(`版本 ${changelog.version} 已存在，将更新该版本日志`);
        } else {
            newData = [changelog, ...existingData];
            log.info(`版本 ${changelog.version} 为新版本，将添加到日志列表`);
        }

        // 保存到 JSON 文件
        await fs.writeFile(
            JSON_OUTPUT_PATH,
            JSON.stringify(newData, null, 2),
            'utf-8'
        );

        log.success(`更新日志保存成功！共 ${newData.length} 条记录`);
        return changelog.version;
    } catch (error) {
        log.error(`保存更新日志失败: ${error.message}`);
        throw error;
    }
}

// 如果直接运行此脚本，则执行解析和保存操作
if (process.argv[1] === __filename) {
    log.info('===== 开始执行更新日志解析脚本 =====');
    (async () => {
        try {
            const changelog = await parseChangelogFromMarkdown();
            await saveChangelogToJson(changelog);
            log.success('===== 更新日志处理完成 =====');
        } catch (error) {
            log.error('===== 处理更新日志时发生错误 =====');
            process.exit(1);
        }
    })();
}

// 仅导出解析相关方法（供需要时调用）
export default {
    parseChangelogFromMarkdown,
    saveChangelogToJson
};
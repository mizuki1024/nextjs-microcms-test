const API_URL = "https://gift-tech.microcms.io/api/v1/articles";

/**
 * 記事一覧を取得する関数
 * 
 * @returns {Promise<{ contents: any[], totalCount: number, offset: number, limit: number }>}
 * - `contents`: 記事データの配列
 * - `totalCount`: 全記事数
 * - `offset`: 現在のオフセット
 * - `limit`: 1回の取得件数
 * @throws API リクエストに失敗した場合、エラーをスロー
 */
export async function fetchArticles() {
  // API から記事一覧を取得
  const res = await fetch(API_URL, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
    },
  });

  // レスポンスが成功しなかった場合、エラーを投げる
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  // レスポンスデータを JSON として取得
  const data = await res.json();

  // デバッグ用に取得データをログ出力（開発時のみ）
  console.log("取得した記事データ:", data);

  return data;
}

/**
 * 記事詳細を取得する関数
 * 
 * @param {string} id - 記事の ID
 * @returns {Promise<any | null>} 記事データ（存在しない場合は `null`）
 */
export async function fetchArticleById(id: string) {
  // API から特定の記事を取得
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
    },
  });

  // レスポンスが失敗した場合、`null` を返す（エラーハンドリング）
  if (!res.ok) {
    return null;
  }

  // 記事データを JSON として取得
  return await res.json();
}

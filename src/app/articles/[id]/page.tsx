"use client"; // クライアントコンポーネントとして実行

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchArticleById } from "../../lib/microcms";

/**
 * 記事詳細ページコンポーネント
 * - microCMS から記事を取得し、詳細を表示する
 * - ローディング状態を管理
 * - 記事が見つからない場合はエラーメッセージを表示
 */
export default function ArticlePage() {
  // URL のパラメータ（`/articles/[id]` の `id`）を取得
  const { id } = useParams();

  // 記事データの状態管理
  const [article, setArticle] = useState<any>(null);

  // ローディング状態（データ取得中かどうか）
  const [loading, setLoading] = useState(true);

  /**
   * 記事データを取得する
   * - `id` が存在する場合、microCMS API から記事を取得
   * - 取得後、`article` ステートを更新
   */
  useEffect(() => {
    async function getArticle() {
      if (!id) return; // `id` がない場合は何もしない
      setLoading(true); // データ取得開始
      const data = await fetchArticleById(id as string); // microCMS API から記事を取得
      setArticle(data); // 記事データをセット
      setLoading(false); // データ取得完了
    }
    getArticle();
  }, [id]); // `id` が変更されるたびに実行

  /**
   * ローディング中の表示
   */
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  /**
   * 記事が取得できなかった場合の表示
   */
  if (!article) {
    return <div className="text-center py-10">記事がありません。</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
        {/* サムネイル画像 */}
        {article.image?.url && (
          <div className="mb-6">
            <img
              src={article.image.url}
              alt={article.title}
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
        )}

        {/* 記事タイトル */}
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        {/* 公開日 */}
        <p className="text-gray-500 text-sm mb-4">
          {article.publishedAt.split("T")[0]}（公開日時）
        </p>

        {/* 本文 */}
        <div className="prose max-w-full">
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>

        {/* 一覧へ戻るボタン */}
        <div className="mt-8 text-center">
          <Link href="/">
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              一覧へ戻る
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

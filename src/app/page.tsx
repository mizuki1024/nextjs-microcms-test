"use client"; // クライアントコンポーネントとして実行

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchArticles } from "./lib/microcms";

/**
 * 記事一覧ページコンポーネント
 * - microCMS から記事を取得
 * - ページネーション対応
 * - 記事のタイトル・サムネイル・説明を表示
 */
export default function ArticlesPage() {
  // クエリパラメータ（?page=1 など）を取得
  const searchParams = useSearchParams();

  // 記事データを格納するステート
  const [articles, setArticles] = useState<any[]>([]);
  
  // 現在のページ番号（デフォルトは1）
  const [currentPage, setCurrentPage] = useState(1);
  
  // 1ページあたりの記事数
  const perPage = 9;

  // 記事を取得し、ステートに保存する
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1; // クエリパラメータからページ番号を取得
    setCurrentPage(page);

    async function loadArticles() {
      const data = await fetchArticles(); // microCMS から記事を取得
      setArticles(data.contents); // 記事データを更新
    }

    loadArticles();
  }, [searchParams]); // クエリパラメータが変わるたびに再実行

  // 記事の総ページ数を計算
  const totalPages = Math.ceil(articles.length / perPage);
  
  // 現在のページに表示する記事を取得
  const paginatedArticles = articles.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">記事一覧</h1>

      {/* 記事リスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedArticles.map((article: any) => (
          <article key={article.id}>
            {/* 記事の詳細ページへリンク */}
            <Link href={`/articles/${article.id}`}>
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={article.image?.url || "/placeholder.svg"} // サムネイル画像
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
                {/* 公開日時を YYYY-MM-DD 形式で表示 */}
                <time className="text-xs text-gray-500 block mt-2">
                  {article.publishedAt.split("T")[0]}(公開日時)
                </time>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* ページネーション（ページ送り） */}
      <div className="flex items-center justify-center gap-2 mt-12">
        {/* ◀ 前のページ */}
        <Link
          href={`?page=${Math.max(1, currentPage - 1)}`}
          className={`px-3 py-2 border rounded bg-black text-white ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          &lt;
        </Link>

        {/* 動的なページナビゲーション */}
        {generatePagination(currentPage, totalPages).map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Link
              key={index}
              href={`?page=${page}`}
              className={`px-3 py-2 border rounded ${
                page === currentPage
                  ? "bg-white text-black border-black" // 現在のページ: 白背景、黒枠、黒文字
                  : "bg-black text-white hover:bg-gray-800" // 他のページ: 黒背景、白文字
              }`}
            >
              {page}
            </Link>
          )
        )}

        {/* ▶ 次のページ */}
        <Link
          href={`?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`px-3 py-2 border rounded bg-black text-white ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          &gt;
        </Link>
      </div>
    </div>
  );
}

/**
 * ページネーション用のページ番号リストを生成
 * 
 * @param currentPage 現在のページ番号
 * @param totalPages 総ページ数
 * @returns 表示するページ番号の配列（例: [1, 2, "...", 10]）
 */
function generatePagination(currentPage: number, totalPages: number) {
  const delta = 2; // 現在のページの前後に表示するページ数
  const range = [];
  let lastPage: number | null = null;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      if (lastPage !== null && i - lastPage !== 1) {
        range.push("..."); // 連続しない部分に「...」を挿入
      }
      range.push(i);
      lastPage = i;
    }
  }

  return range;
}

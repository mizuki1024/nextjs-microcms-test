import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchArticles } from "./lib/microcms";

/**
 * 記事の型定義
 */
interface Article {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  image?: { url: string };
}

/**
 * 記事一覧ページ (サーバーサイドでデータ取得)
 */
export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // searchParams を await で取得
  const params = await searchParams;
  const currentPage = Number(params.page ?? "1"); // デフォルトを "1" に

  const perPage = 9;
  const data = await fetchArticles();
  const articles = data.contents;
  const totalPages = Math.ceil(articles.length / perPage);

  const paginatedArticles = articles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">記事一覧</h1>
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <ArticleList articles={paginatedArticles} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}

/**
 * 記事リストを表示するコンポーネント (サーバー側)
 */
function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article key={article.id}>
          <Link href={`/articles/${article.id}`}>
            <div className="relative aspect-video bg-gray-200">
              <Image
                src={article.image?.url || "/placeholder.svg"}
                alt={article.title}
                width={400}
                height={200}
                className="w-full h-auto object-cover"
                priority={true} 
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {article.description}
              </p>
              <time className="text-xs text-gray-500 block mt-2">
                {article.publishedAt.split("T")[0]}（公開日時）
              </time>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

/**
 * ページネーションコンポーネント
 */
function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <Link
        href={`?page=${Math.max(1, currentPage - 1)}`}
        className={`px-3 py-2 border rounded bg-black text-white ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-800"
        }`}
      >
        &lt;
      </Link>

      {generatePagination(currentPage, totalPages).map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-2 text-gray-500">...</span>
        ) : (
          <Link
            key={index}
            href={`?page=${page}`}
            className={`px-3 py-2 border rounded ${
              page === currentPage
                ? "bg-white text-black border-black"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {page}
          </Link>
        ),
      )}

      <Link
        href={`?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-3 py-2 border rounded bg-black text-white ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-800"
        }`}
      >
        &gt;
      </Link>
    </div>
  );
}

/**
 * ページネーションのロジック
 */
function generatePagination(
  currentPage: number,
  totalPages: number,
): (number | string)[] {
  const delta = 1;
  const range: (number | string)[] = [];
  let lastPage: number | null = null;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      if (lastPage !== null && i - lastPage !== 1) {
        range.push("...");
      }
      range.push(i);
      lastPage = i;
    }
  }

  return range;
}

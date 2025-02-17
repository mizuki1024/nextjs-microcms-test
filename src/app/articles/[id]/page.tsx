"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchArticleById } from "../../lib/microcms";

/**
 * 記事の型定義
 */
interface Article {
  id: string;
  title: string;
  description: string;
  body: string;
  publishedAt: string;
  image?: { url: string };
}

/**
 * 記事詳細ページコンポーネント
 */
export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function getArticle() {
      setLoading(true);
      try {
        const data = await fetchArticleById(id as string);
        setArticle(data || null);
      } catch (error) {
        console.error("記事の取得中にエラーが発生しました:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    getArticle();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!article) return <ErrorScreen />;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
        <ArticleContent article={article} />
        <BackToListButton />
      </div>
    </div>
  );
}

/**
 * 記事コンテンツを表示するコンポーネント
 */
function ArticleContent({ article }: { article: Article }) {
  return (
    <>
      {/* サムネイル画像 */}
      {article.image?.url && (
        <div className="mb-6">
          <Image
            src={article.image.url}
            alt={article.title}
            width={800}
            height={400}
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

      {/* 記事本文 */}
      <div className="prose max-w-full">
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </>
  );
}

/**
 * 記事が見つからない場合のエラーメッセージ
 */
function ErrorScreen() {
  return <div className="text-center py-10">記事がありません。</div>;
}

/**
 * ローディング画面
 */
function LoadingScreen() {
  return <div className="text-center py-10">Loading...</div>;
}

/**
 * 一覧へ戻るボタン
 */
function BackToListButton() {
  return (
    <div className="mt-8 text-center">
      <Link href="/">
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          一覧へ戻る
        </button>
      </Link>
    </div>
  );
}

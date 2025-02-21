import { fetchArticleById } from "../../lib/microcms";
import Image from "next/image";
import Link from "next/link";

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
 * 記事詳細ページ（サーバーサイドで記事を取得）
 */
export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  // `params` を await で取得
  const resolvedParams = await params;
  const article: Article | null = await fetchArticleById(resolvedParams.id);

  if (!article) {
    return <div className="text-center py-10 font-sans">記事がありません。</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl bg-white">
      <ArticleContent article={article} />
      <BackToListButton />
    </div>
  );
}

/**
 * 記事コンテンツを表示するコンポーネント
 */
function ArticleContent({ article }: { article: Article }) {
  return (
    <>
      {/* サムネイル画像（ページ上部との間に余白を追加） */}
      {article.image?.url && (
        <div className="mt-6 mb-6">
          <Image
            src={article.image.url}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto shadow-md"
          />
        </div>
      )}

      {/* 記事タイトル */}
      <h1 className="text-3xl sm:text-4xl font-extrabold font-serif leading-tight mb-4">
        {article.title}
      </h1>

      {/* 公開日 */}
      <p className="text-gray-500 text-sm sm:text-base font-mono mb-6">
        {article.publishedAt.split("T")[0]}（公開日時）
      </p>

      {/* 記事本文 */}
      <div className="prose prose-lg max-w-full font-sans">
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </>
  );
}

/**
 * 一覧へ戻るボタン
 */
function BackToListButton() {
  return (
    <div className="mt-8 mb-10 text-center">
      <Link href="/">
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-sans">
          一覧へ戻る
        </button>
      </Link>
    </div>
  );
}

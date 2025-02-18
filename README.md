# nextjs-microcms-test
Next.js (App Router) + microCMS + Firebase を使用したフロントエンドコーディングテスト用のメディアサイト
# 1. プロジェクトの概要


![image](https://github.com/user-attachments/assets/1d14c548-7a12-4bda-b986-92bb87426a53)

このプロジェクトは Vercel にデプロイされています。以下のリンクからアクセスできます。

https://nextjs-microcms-test-66k1-7u2ir5v3b-mizuki1024s-projects.vercel.app/

##  プロジェクト名
**Next.js + microCMS 記事管理プロジェクト**

## プロジェクトの目的
本プロジェクトは、**Next.js (App Router) + microCMS** を活用して、記事の一覧・詳細ページを表示するシステムを開発することを目的としています。  
ページネーションや画像最適化の機能も実装し、スムーズなユーザー体験を提供します。

## プロジェクト体制
- **開発メンバー:** 1 名
- **フロントエンド担当:** [mizuki1024]

##  プロジェクト行程
| タスク | 期間 |
|--------|------|
| **開発開始日** | 2025/2/18 |
| **リリース** | 2025/2/18 |

# 2. 主要技術

| 言語・フレームワーク | バージョン |
|--------------------|----------|
| **Next.js** | 15.1.7 |
| **TypeScript** | 5.7.3 |
| **microCMS** | API ベース |
| **Tailwind CSS** | 3.4.1 |
| **Vercel** | デプロイ環境 |
| **Node.js** | 22.13.1 |

# 3. ディレクトリ構造

./

│── .next/               # Next.js のビルド・キャッシュフォルダ（自動生成）

│── node\_modules/        # 依存パッケージ（npm install で生成）

│── public/              # 静的ファイル（画像・favicon など）

│

├── src/                 # ソースコードディレクトリ

│   ├── app/             # Next.js のルーティング用フォルダ

│   │   ├── articles/    # 記事詳細ページ用フォルダ

│   │   │   ├── [id]/    # 記事の動的ルート（`[id]` はパラメータ）

│   │   │   │   ├── page.tsx  # 記事詳細ページコンポーネント

│   │   ├── lib/         # API 通信やデータ取得用関数

│   │   │   ├── microcms.ts  # microCMS からデータを取得する関数

│   │   ├── favicon.ico  # サイトアイコン

│   │   ├── globals.css  # 全体のスタイル（CSS）

│   │   ├── layout.tsx   # 全体のレイアウトコンポーネント

│   │   ├── page.tsx     # 記事一覧ページのコンポーネント

│

├── .env                 # 環境変数（APIキーなどを管理）

├── .gitattributes       # Git での改行コードなどの設定

├── .gitignore           # Git で無視するファイルを指定

├── eslint.config.mjs    # ESLint（コードチェックツール）の設定

├── LICENSE              # ライセンス情報

├── next-env.d.ts        # Next.js の型定義

├── next.config.ts       # Next.js の設定ファイル

├── package-lock.json    # 依存関係を固定するファイル

├── package.json         # npm パッケージ管理ファイル

├── postcss.config.mjs   # PostCSS の設定ファイル

├── README.md            # プロジェクトの説明書

├── tailwind.config.ts   # Tailwind CSS の設定

└── tsconfig.json        # TypeScript の設定


# 5. 開発環境構築方法

このプロジェクトの開発環境をセットアップする手順を説明します。

##  1. 必要な環境
このプロジェクトは **Next.js + microCMS** を使用しており、以下の環境が必要です。

| 項目          | バージョン例 |
|--------------|-------------|
| **OS**      | Windows 10 / 11, macOS, Linux |
| **Node.js** | `v18.x` 以上 |
| **npm**     | `v9.x` 以上 |
| **Git**     | 最新版推奨 |

###  確認方法

```
node -v  # Node.js のバージョン確認
npm -v   # npm のバージョン確認
git --version  # Git のバージョン確認
```

## プロジェクトのセットアップ
 
1️ リポジトリのクローン
GitHub からプロジェクトをローカルにクローンします。

```
https://github.com/mizuki1024/nextjs-microcms-test.git
```

2 ディレクトリへ移動します。

```
cd nextjs-microcms-test
```

3 必要なパッケージをインストール
プロジェクトの依存パッケージを npm install でインストールします。

```
npm install
```

4 .env ファイルの作成
環境変数を管理するために .env ファイルを作成し、以下の内容を記述してください。

```
# microCMS の API キー
NEXT_PUBLIC_MICROCMS_API_KEY=your-microcms-api-key
```

5 開発サーバーの起動
開発環境を起動します。

```
npm run dev
```

ターミナルに表示される URL にアクセスして、開発環境を確認してください。

Local:http://localhost:3000
ブラウザ: http://localhost:3000 

にアクセスすると、記事一覧ページが表示されるはずです。


## 開発に使用するコマンド
 
| コマンド  | 説明  |
|----|----|
|npm run dev|開発サーバーを起動する|
|npm run build	|本番環境用にビルドする|
|npm run start |	ビルドしたアプリを実行する |

## デプロイ 
本番環境にデプロイする場合、Vercel を使用するのが簡単です。

https://vercel.com/





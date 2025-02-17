const API_URL = "https://gift-tech.microcms.io/api/v1/articles";

export async function fetchArticles() {
  const res = await fetch(API_URL, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json(); 
  console.log("取得した記事データ:", data); 

  return data; 
}


export async function fetchArticleById(id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
      },
    });
  
    if (!res.ok) {
      return null;
    }
  
    return await res.json();
  }
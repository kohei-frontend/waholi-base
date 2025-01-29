export async function fetchPosts() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;
    if (!apiUrl) {
      console.error("API URLが設定されていません");
      return [];
    }
    try {
      const res = await fetch(`${apiUrl}post`, {
        headers: {
          'apikey': apiKey, // APIキーをヘッダーに追加
        }
      });
      if (!res.ok) {
        throw new Error(`HTTPエラー! ステータス: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
      return [];
    }
  }
  
export async function fetchpost() {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }
    const data = await response.json();
    console.log("results", data);
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
  }
}
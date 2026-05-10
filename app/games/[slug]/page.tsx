export default function GameDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1>Detail: {params.slug}</h1>
    </main>
  );
}
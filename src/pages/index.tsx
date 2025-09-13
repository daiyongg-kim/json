import dynamic from 'next/dynamic';

const JSONParser = dynamic(() => import('@/components/JSONParser'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading JSON Parser...</div>
    </div>
  )
});

export default function Home() {
  return <JSONParser />;
}
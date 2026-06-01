import Header from "@/components/Header";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-2xl mx-auto p-6 mt-10">
        <div className="bg-white rounded-3xl shadow p-8 text-center">
          <div className="text-6xl mb-4">✅</div>

          <h1 className="text-3xl font-bold">Order Confirmed</h1>

          <p className="text-gray-500 mt-3">
            Thank you! Your order has been received successfully.
          </p>

          <div className="mt-8 text-left bg-gray-50 rounded-2xl p-5 space-y-3">
            <p><b>Status:</b> Payment Successful</p>
            <p><b>Order Status:</b> Confirmed</p>
            <p><b>Estimated Delivery:</b> 25–40 minutes</p>
            <p><b>Restaurant:</b> Village Tandoori</p>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            You will receive updates when the restaurant accepts and prepares your order.
          </p>
        </div>
      </section>
    </main>
  );
}
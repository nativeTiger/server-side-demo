import UsersPage from "@/pages/users/users-page";

function App() {
  return (
    <main>
      <section className="mx-auto px-16">
        <h1 className="text-gray-800 text-4xl font-bold text-center py-6">
          Server Side Pagination, Search and Sorting
        </h1>
        <UsersPage />
      </section>
    </main>
  );
}

export default App;

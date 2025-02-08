import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  return await response.json();
}

export default function StatusPage() {
  return (
    <>
      <h1>Status Page</h1>
      <p>This is the status page</p>
      <UpdatedAt />
      <DatabaseInfo />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Loading...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <p>Updated at: {updatedAtText}</p>;
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatus = "Loading...";

  if (!isLoading && data) {
    const databaseInfo = data.dependencies.database;
    databaseStatus = (
      <>
        <div>
          <p>Version: {databaseInfo.version}</p>
        </div>
        <div>
          <p>Max Connections: {databaseInfo.max_connections}</p>
        </div>
        <div>
          <p>Opened Connections: {databaseInfo.opened_connections}</p>
        </div>
      </>
    );
  }
  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatus}</div>
    </>
  );
}

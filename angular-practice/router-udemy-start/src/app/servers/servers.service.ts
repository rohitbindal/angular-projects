export class ServersService {
  private servers = [
    {
      id: 1,
      name: "Productionserver",
      status: "online",
    },
    {
      id: 2,
      name: "Testserver",
      status: "offline",
    },
    {
      id: 3,
      name: "Devserver",
      status: "offline",
    },
  ];

  // Return all the servers
  getServers() {
    return this.servers;
  }

  // Return a single server using the 'id'
  getServer(id: number) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    return server;
  }

  // Update the server data.
  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}

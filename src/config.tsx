const prod = true; 
export default {
  node: {
    prefix: '/admin',
  },
  catalog: {
    back: {
      host: prod ? '' : 'http://localhost',
      port: prod ? 0 : 3100,
    }
  },
  auth: {
    back: {
      host: prod ? '' : 'http://192.168.0.121',
      port: prod ? 0 : 3001,
    }
  },
  info: {
    back: {
      host: prod ? '' : 'http://192.168.0.121',
      port: prod ? 0 : 3200,
    }
  },
  mcontent: {
    back: {
      host: prod ? '' : 'http://192.168.0.121',
      port: prod ? 0 : 3020,
    }
  },
  mnote: {
    back: {
      host: prod ? '' : 'http://192.168.0.121',
      port: prod ? 0 : 3300,
    }
  },
}

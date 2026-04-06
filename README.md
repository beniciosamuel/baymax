# BAYMAX

> Serviço de gestão e análise de demandas médicas

<img src="./docs/Big-Hero-6-Background-PNG.png" width="200">

## Prerequisites

- Instalar e configurar GCloud cli

### Instalar e configurar Redis com cli

```
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis

# Habilitar redis
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

![alt text](docs/image.png)

![alt text](docs/baymax_schema.png)

![alt text](docs/baymax_server.png)

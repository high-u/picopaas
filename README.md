# Pico PaaS

## Install

Amazon Linux 2

```shell
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
sudo gpasswd -a $USER docker
sudo systemctl restart docker
exit
```

```shell
git clone https://github.com/high-u/picopaas.git
cd picopaas
node server.js ~
```

## Usage

```shell
git remote add picopaas http://xxx.xxx.xxx.xxx:3000/username/projectname.git
git add .
git commit -m 'update'
git push picopaas master
```

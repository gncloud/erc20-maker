

tar zcf dist.tar.gz dist/*

rsync --progress dist.tar.gz ubuntu@15.164.106.150:/home/ubuntu -e "ssh -i ~/aws-pem/gncloud-io.pem"

ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 "sudo rm -rf /var/www/html/tokens/*"

ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 "sudo tar zxvf /home/ubuntu/dist.tar.gz -C /var/www/html/tokens/"

ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 "sudo mv /var/www/html/tokens/dist/* /var/www/html/tokens/"

ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 "sudo rm -rf /home/ubuntu/dist.tar.gz"

rm -rf dist.tar.gz
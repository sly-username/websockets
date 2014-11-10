# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = true

  config.vm.synced_folder "./", "/home/vagrant/clientapp"

  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 81, host: 81

  config.vm.provision :shell, inline: 'apt-get install -y git', privileged: true
  config.vm.provision :shell, path: "provision.sh", privileged: false

end

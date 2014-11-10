# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = true

  config.vm.synced_folder "./", "/home/vagrant/clientapp"

  config.vm.network "forwarded_port", guest: 5115, host: 5115
  config.vm.network "forwarded_port", guest: 5116, host: 5116

  config.vm.provision :shell, inline: 'apt-get install -y git', privileged: true
  config.vm.provision :shell, path: "provision.sh", privileged: false

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--name", "Local Node Server"]
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end

end

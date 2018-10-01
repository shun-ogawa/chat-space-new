server '54.178.246.51', user: 'ec2-user', roles: %w{app db web}
set :ssh_options, {
   keys: [File.expand_path('~/.ssh/key_pair.pem)')]
}

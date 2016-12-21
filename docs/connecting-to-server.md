# Connecting to the server
Starting from your user directory (`/Users/Your username`):

1. Download the [private certificate](https://github.com/masoncusack/emergingtechcomp/blob/master/docs/komoterpl.pem) file
2. Put it in `.ssh` directory
3. Open `.ssh/config` with a text editor (if it doesn't exist, just create it)
4. Enter the following, replacing `Your username`:
```
Host etech
        User ubuntu
        HostName 52.212.252.3
        IdentityFile /Users/Your username/.ssh/komoterpl.pem
```
You should be able to connect to the server using `ssh etech`.

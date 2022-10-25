Notatnik Dawid/Igor

### API

#### REGISTER

Example --> http://127.0.0.1:5000/api/register?username=tojestlogin&email=tojestemail&password=tojesthaslo&confirmation=tojesthaslo

#### LOGIN

GET
Example --> http://127.0.0.1:5000/api/login?username=igorek&password=12345

We shouldn't send login and password this way. They shouldn't be visible in the link.

#### LOGOUT

Example --> http://127.0.0.1:5000/api/logout

#### PERSONAL TEST

Please let me know when the form on the frontend will be ready @Igor
Example --> http://127.0.0.1:5000/api/personal_test........

Currently personal_test doesn't include POST endpoint, so it's impossible to send any data.

### GENERAL COMMENTS

It would be nice to send all the data inside of request's body rather than through endpoint attributes.
This way endpoints would become cleaner and easier to handle.

I'm unable to start backend server. app.py throws error in line 1:
ImportError: The crypt module is not supported on Windows

### COMMANDS

Uninstall all python packages:

- pip uninstall -y $(pip freeze)

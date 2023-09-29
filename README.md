# doctors_booking

## Folder Structure

```
.
├── docker-compose.yaml     `<- Container docker compose for testing`
├── Dockerfile              `<- Container Dockerfile for building`
├── doctors_booking         `<- Container Django`
│   ├── api                 `<- Container Backend`
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── __init__.py
│   │   ├── migrations
│   │   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── db.sqlite3          `<- Container Database`
│   ├── doctors_booking     `<- Container Service`
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── frontend            `<- Container Frontend`
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── __init__.py
│   │   ├── migrations
│   │   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   ├── static              `<- Container Static Files`
│   │   ├── css
│   │   ├── images
│   │   └── js
│   └── templates
│       ├── api              `<- Container API HTML`
│       │   └── index.html
│       └── frontend         `<- Container Frontend HTML`
│           └── index.html
├── gunicorn                 `<- Container WSGI (Web Server Gateway Interface)`
│   ├── gunicorn.conf.py
│   ├── gunicorn.sh
│   └── nginx.conf           `<- Container nginx (proxy gateway)`
├── poetry.lock
├── pyproject.toml           `<- Used for installing python packages`
├── README.md
└── scripts                  `<- Container Startup Scripts`
    ├── 40-variables.sh
    └── 50-run.sh
16 directories, 47 files
```

## Test Container

1. Navigate to folder.

2. Run Docker Compose File.

    ```bash
    docker compose up
    ```

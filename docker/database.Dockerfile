FROM postgres:latest

ENV POSTGRES_DB=GoTo
ENV POSTGRES_USER=GoTo
ENV POSTGRES_PASSWORD=qwerty

RUN psql -U postgres -d $POSTGRES_DB -c "CREATE DATABASE \"GoTo\";"
RUN psql -U postgres -d $POSTGRES_DB -c "CREATE ROLE \"GoTo\" WITH PASSWORD '$POSTGRES_PASSWORD';"
RUN psql -U postgres -d $POSTGRES_DB -c "GRANT ALL PRIVILEGES ON DATABASE \"GoTo\" TO \"GoTo\";"
RUN psql -U postgres -d $POSTGRES_DB -c "ALTER ROLE \"GoTo\" WITH LOGIN;"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE TABLE \
    \"user\" ( \
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, \
        NAME VARCHAR(30) NOT NULL, \
        PASSWORD VARCHAR(100) NOT NULL, \
        email VARCHAR(255) UNIQUE NOT NULL, \
        birth_date date not null, \
        about TEXT, \
        avatar_url VARCHAR(255), \
        creation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL, \
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL \
    );"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE TABLE \
    place ( \
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, \
        NAME VARCHAR(100) NOT NULL, \
        description TEXT NOT NULL, \
        COST VARCHAR(10) NOT NULL, \
        image_url VARCHAR(255), \
        open_time time, \
        close_time time CHECK(open_time is null or close_time > open_time), \
        adress text, \
        web_site varchar(40), \
        email varchar(40), \
        phone_number varchar(30), \
        creation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL, \
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL \
    );"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE TABLE \
    trip ( \
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, \
        user_id INTEGER NOT NULL REFERENCES \"user\" ON DELETE CASCADE, \
        NAME VARCHAR(30) NOT NULL, \
        is_public BOOLEAN DEFAULT FALSE NOT NULL, \
        creation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL, \
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL \
    );"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE TABLE \
    review ( \
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, \
        user_id INTEGER NOT NULL REFERENCES \"user\" ON DELETE CASCADE, \
        place_id INTEGER NOT NULL REFERENCES place (id) ON DELETE CASCADE, \
        CONTENT TEXT, \
        rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL, \
        creation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL, \
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL \
    );"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE TABLE \
    trip_to_place ( \
        place_id INTEGER NOT NULL REFERENCES place (id) ON DELETE CASCADE, \
        trip_id INTEGER NOT NULL REFERENCES trip (id) ON DELETE CASCADE, \
        visit_date date, \
        PRIMARY KEY (place_id, trip_id) \
    );"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE OR REPLACE FUNCTION update_time() \
    RETURNS TRIGGER AS $$ \
    BEGIN \
        NEW.last_updated := NOW(); \
        RETURN NEW; \
    END; \
    $$ LANGUAGE plpgsql;"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE OR REPLACE TRIGGER \"before_update_user_trigger\" \
    BEFORE UPDATE ON \"user\" \
    FOR EACH ROW \
    EXECUTE FUNCTION update_time();"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE OR REPLACE TRIGGER \"before_update_place_trigger\" \
    BEFORE UPDATE ON place \
    FOR EACH ROW \
    EXECUTE FUNCTION update_time();"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE OR REPLACE TRIGGER \"before_update_trip_trigger\" \
    BEFORE UPDATE ON trip \
    FOR EACH ROW \
    EXECUTE FUNCTION update_time();"

RUN psql -U GoTo -d $POSTGRES_DB -c "CREATE OR REPLACE TRIGGER \"before_update_review_trigger\" \
    BEFORE UPDATE ON review \
    FOR EACH ROW \
    EXECUTE FUNCTION update_time();"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Эфелева башня', 'Это знаменитое архитектурное сооружение, которое находится в центре Парижа, Франция. Эта башня является одной из самых узнаваемых и посещаемых достопримечательностей мира, а также символом как самого Парижа, так и Франции в целом.', '\$\$', 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1fmKP5.img', 'Марсово поле, 5 Авеню Анатоля Франса');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Эрмитаж', 'Это один из самых знаменитых и крупнейших музеев мира, расположенный в Санкт-Петербурге, Россия. Этот музей является одной из наиболее значимых культурных достопримечательностей России и мировым центром искусства и культуры.', '\$', 'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663090921_7-mykaleidoscope-ru-p-zимнii-dvorets-sанкт-pетербург-красиво-7.jpg', 'Дворцовая Набережная, 38 / Дворцовая площадь, 2');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('МГТУ им. Баумана', 'Является одним из ведущих технических университетов в России и весьма престижным учебным заведением.', '\$\$\$', 'https://sun6-23.userapi.com/XEbCUs5UIcV3L-JP87lxuKEWyRl9KgbNwaU91g/3ywb_ZTuGMs.jpg', '2-я Бауманская ул., 5, стр. 4, Москва');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Петра I памятник', 'Памятник Петру I, также известный как Бронзовый всадник, - это памятник российскому императору Петру I, установленный в Санкт-Петербурге.', '\$\$', 'https://img.tourister.ru/files/1/8/8/7/6/5/6/0/original.jpg', 'Кленовая ул., 2, Санкт-Петербург, 191023');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Статуя Свободы', 'Статуя Свободы находится на острове Свободы в Нью-Йорке и является одним из символов Соединенных Штатов Америки.', '\$\$', 'https://i.imgur.com/pOSbnHXh.jpg', 'New York, NY 10004, Соединенные Штаты');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Гренландия', 'Гренландия - крупнейший остров в мире и административно-территориальное подразделение Королевства Дании.', '\$\$\$', 'https://10wallpaper.com/wallpaper/5120x2880/2103/Windows_10x_Microsoft_2021_Ocean_Glacier_5K_HD_Photo_5120x2880.jpg', 'Гренландия');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Колизей', 'Колизей - это амфитеатр в Риме, построенный в I веке н.э. и считающийся одним из величайших архитектурных и инженерных достижений древнего мира.', '\$\$', 'https://sportishka.com/uploads/posts/2022-04/1650595488_15-sportishka-com-p-italiya-kolizei-krasivo-foto-15.jpg', 'Piazza del Colosseo, 1, 00184 Roma RM, Италия');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Маяк Александрия', 'Маяк Александрия был одним из семи чудес света и находился в древнем городе Александрия, в Египте.', '\$\$\$', 'https://polinka.top/uploads/posts/2023-06/thumbs/1685742571_polinka-top-p-картинка-александрия-египетская-instagr-44.jpg', '-');"

RUN psql -U GoTo -d $POSTGRES_DB -c "INSERT INTO place (name, description, cost, image_url, adress) VALUES ('Скайдайвинг в Нью Зеландии', 'Нью Зеландия предлагает невероятные возможности для скайдайвинга с потря

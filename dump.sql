--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    hashtag text NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    status boolean DEFAULT true NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: post_hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_hashtags (
    id integer NOT NULL,
    post_id integer NOT NULL,
    hashtag_id integer NOT NULL
);


--
-- Name: post_hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_hashtags_id_seq OWNED BY public.post_hashtags.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    description text NOT NULL,
    external_link text NOT NULL,
    publish_date timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    profile_picture text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: post_hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_hashtags ALTER COLUMN id SET DEFAULT nextval('public.post_hashtags_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (5, '#express');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: post_hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.post_hashtags VALUES (85, 70, 5);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (56, 1, 'um teste 1', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 17:16:09.102');
INSERT INTO public.posts VALUES (57, 1, 'um teste aleatorio', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 17:30:10.885');
INSERT INTO public.posts VALUES (58, 1, 'teste 12', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 17:31:27.636');
INSERT INTO public.posts VALUES (59, 1, 'Teste 13', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 17:42:59.538');
INSERT INTO public.posts VALUES (60, 1, 'Testando', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 18:10:25.443');
INSERT INTO public.posts VALUES (61, 1, 'teste 15', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 18:20:33.861');
INSERT INTO public.posts VALUES (62, 1, 'teste 16 #postgres', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:21:01.234');
INSERT INTO public.posts VALUES (63, 1, 'teste 123', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:33:14.937');
INSERT INTO public.posts VALUES (64, 1, 'teste 123 #linkedin', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:33:32.23');
INSERT INTO public.posts VALUES (65, 1, 'teste 124', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:38:53.02');
INSERT INTO public.posts VALUES (66, 1, '123456', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:40:07.353');
INSERT INTO public.posts VALUES (67, 1, 'teste 12345', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:42:17.277');
INSERT INTO public.posts VALUES (68, 1, 'teste 12345', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:43:04.711');
INSERT INTO public.posts VALUES (69, 1, 'teste 24', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:44:27.913');
INSERT INTO public.posts VALUES (70, 1, 'teste #express', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:46:31.283');
INSERT INTO public.posts VALUES (71, 1, '12345 teste', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:49:59.767');
INSERT INTO public.posts VALUES (72, 1, 'testando', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:58:29.324');
INSERT INTO public.posts VALUES (73, 1, 'testando 2', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:59:11.725');
INSERT INTO public.posts VALUES (74, 1, 'testando 2', 'https://github.com/Marcio-VOT/Linkr-back/', '2023-03-10 20:59:32.658');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Dickson', 'dicksonpinheiro4@gmail.com', '$2b$06$S.qttR4DeFehejY9pjclfu0ncgii6rVrA4fAxyXlfN/rSK5ysv88C', 'https://avatars.githubusercontent.com/u/62717698?v=4');
INSERT INTO public.users VALUES (5, 'Dennis', 'dennispinheiro97@gmail.com', '$2b$06$ADHxSRr9lV4BFqxV3EFmxOLbgxY4pxlZh2VJeKfbL2.mxbp6RiX5a', 'https://avatars.githubusercontent.com/u/62717698?v=4');
INSERT INTO public.users VALUES (6, 'jane', 'jane@acme.com', '$2b$06$A22QkC8Yl5ZsujGQ20Cafe3UhClpSfrzfwclzUHFnMsoTT15aIZGK', 'https://avatars.githubusercontent.com/u/62717698?v=4');
INSERT INTO public.users VALUES (7, 'aadad', 'aaadad@ad.com', '$2b$06$ElTSiTj.KHFLP6jlN5GyfOxzhexliUgastjlw4YX4ds/PvJLNNS7O', 'https://avatars.githubusercontent.com/u/62717698?v=4');
INSERT INTO public.users VALUES (8, 'Dickson', 'dicksonpinheiro97@gmail.com', '$2b$06$l1pSGLprfaOfiXklJfmYyehIukvOXxhzA4z6QDLXNKPkUJInhTIHi', 'https://avatars.githubusercontent.com/u/62717698?v=4');
INSERT INTO public.users VALUES (9, 'Dickson 2', 'dicksonpinheiro45@gmail.com', '$2b$06$3mQNcbSILbMR9XJVVNC6DuEmK05EEv8OGOBm4jRZIuLI8qPdh6wpq', 'https://avatars.githubusercontent.com/u/62717698?v=4');
INSERT INTO public.users VALUES (10, 'Den', 'dennis@gmail.com', '$2b$06$Uma7osW6fSSVnYRzvtqxde.CDIayyJeguVU/QI80//.mMaa5ZmDcu', 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Caranguejo_u%C3%A7%C3%A1.png');


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 5, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 8, true);


--
-- Name: post_hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_hashtags_id_seq', 85, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 74, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: post_hashtags post_hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_hashtags
    ADD CONSTRAINT post_hashtags_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: post_hashtags post_hashtags_hashtag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_hashtags
    ADD CONSTRAINT post_hashtags_hashtag_id_fkey FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);


--
-- Name: post_hashtags post_hashtags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_hashtags
    ADD CONSTRAINT post_hashtags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

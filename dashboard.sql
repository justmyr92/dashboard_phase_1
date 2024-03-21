--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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
-- Name: annual_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.annual_reports (
    annual_report_id integer NOT NULL,
    annual_report_year character varying(4) NOT NULL,
    annual_report_file character varying(255),
    sdo_officer_id character varying(25) NOT NULL
);


ALTER TABLE public.annual_reports OWNER TO postgres;

--
-- Name: annual_reports_annual_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.annual_reports_annual_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.annual_reports_annual_report_id_seq OWNER TO postgres;

--
-- Name: annual_reports_annual_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.annual_reports_annual_report_id_seq OWNED BY public.annual_reports.annual_report_id;


--
-- Name: campus_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campus_table (
    campus_id character varying(25) NOT NULL,
    campus_name character varying(50),
    campus_address character varying(255),
    campus_phone character varying(25),
    campus_email character varying(50),
    sd_no integer
);


ALTER TABLE public.campus_table OWNER TO postgres;

--
-- Name: csd_officer_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.csd_officer_table (
    csd_officer_id character varying(25) NOT NULL,
    csd_officer_name character varying(50),
    csd_officer_email character varying(50),
    csd_officer_phone character varying(25),
    csd_officer_password character varying(255)
);


ALTER TABLE public.csd_officer_table OWNER TO postgres;

--
-- Name: file_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.file_table (
    file_id integer NOT NULL,
    file_name character varying(255),
    file_extension character varying(10),
    record_data_id character varying(25)
);


ALTER TABLE public.file_table OWNER TO postgres;

--
-- Name: file_table_file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.file_table_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.file_table_file_id_seq OWNER TO postgres;

--
-- Name: file_table_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.file_table_file_id_seq OWNED BY public.file_table.file_id;


--
-- Name: instrument_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instrument_table (
    instrument_id integer NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(50),
    date_posted date
);


ALTER TABLE public.instrument_table OWNER TO postgres;

--
-- Name: notification_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification_table (
    unit_id character varying(25),
    notification_date date NOT NULL,
    message text NOT NULL
);


ALTER TABLE public.notification_table OWNER TO postgres;

--
-- Name: record_data_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_data_table (
    record_data_id character varying(25) NOT NULL,
    record_date date,
    record_status character varying(50),
    record_id character varying(25),
    unit_id character varying(25),
    request_id character varying(25)
);


ALTER TABLE public.record_data_table OWNER TO postgres;

--
-- Name: record_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_table (
    record_id character varying(25) NOT NULL,
    record_name character varying(100),
    sdg_id character varying(25),
    instrument_id integer,
    record_status character varying(55)
);


ALTER TABLE public.record_table OWNER TO postgres;

--
-- Name: record_value_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record_value_table (
    record_value_id character varying(25) NOT NULL,
    record_data_id character varying(25),
    value character varying(255),
    record_id character varying(25)
);


ALTER TABLE public.record_value_table OWNER TO postgres;

--
-- Name: request_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_table (
    request_id character varying(25) NOT NULL,
    request_title character varying(255),
    request_description text,
    start_date date,
    due_date date,
    instrument_id integer
);


ALTER TABLE public.request_table OWNER TO postgres;

--
-- Name: sdg_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sdg_table (
    sdg_id character varying(25) NOT NULL,
    sdg_no integer,
    sdg_name character varying(50),
    sdg_description character varying(255)
);


ALTER TABLE public.sdg_table OWNER TO postgres;

--
-- Name: sdo_officer_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sdo_officer_table (
    sdo_officer_id character varying(25) NOT NULL,
    sdo_officer_name character varying(50),
    sdo_officer_email character varying(50),
    sdo_officer_phone character varying(25),
    sdo_officer_password character varying(255),
    campus_id character varying(25)
);


ALTER TABLE public.sdo_officer_table OWNER TO postgres;

--
-- Name: tag_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag_table (
    tag_id integer NOT NULL,
    record_id character varying(25) NOT NULL,
    unit_id character varying(25) NOT NULL
);


ALTER TABLE public.tag_table OWNER TO postgres;

--
-- Name: tag_table_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_table_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tag_table_tag_id_seq OWNER TO postgres;

--
-- Name: tag_table_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tag_table_tag_id_seq OWNED BY public.tag_table.tag_id;


--
-- Name: unit_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unit_table (
    unit_id character varying(25) NOT NULL,
    unit_name character varying(50),
    unit_address character varying(255),
    unit_phone character varying(25),
    unit_email character varying(50),
    unit_password character varying(255),
    sdo_officer_id character varying(25),
    campus_id character varying(25),
    status boolean
);


ALTER TABLE public.unit_table OWNER TO postgres;

--
-- Name: annual_reports annual_report_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annual_reports ALTER COLUMN annual_report_id SET DEFAULT nextval('public.annual_reports_annual_report_id_seq'::regclass);


--
-- Name: file_table file_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file_table ALTER COLUMN file_id SET DEFAULT nextval('public.file_table_file_id_seq'::regclass);


--
-- Name: tag_table tag_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_table ALTER COLUMN tag_id SET DEFAULT nextval('public.tag_table_tag_id_seq'::regclass);


--
-- Data for Name: annual_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.annual_reports (annual_report_id, annual_report_year, annual_report_file, sdo_officer_id) FROM stdin;
786330	2024	Annual Report 2024-03-09.pdf	SD544496
\.


--
-- Data for Name: campus_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campus_table (campus_id, campus_name, campus_address, campus_phone, campus_email, sd_no) FROM stdin;
11	Balayan Campus	Balayan, Batangas	425-3817	bsu.balayan@g.bastateu-edu.ph	2
10	Lobo Campus	Lobo, Batangas	425-5162	bsu.lobo@g.bastateu-edu.ph	2
9	Mabini Campus	Mabini, Batangas	425-8172	bsu.mabini@g.bastateu-edu.ph	2
8	San Juan Campus	San Juan, Batangas	425-7173	bsu.sanjuan@g.bastateu-edu.ph	1
7	Rosario Campus	Rosario, Batangas	425-8192	bsu.rosario@g.bastateu-edu.ph	1
6	Lemery Campus	Lemery, Batangas	425-7651	bsu.lemery@g.bastateu-edu.ph	1
5	ARASOF - Nasugbu Campus	Nasugbu, Batangas	425-1901	bsu.nasugbu@g.bastateu-edu.ph	5
2	Alangilan Campus	Alangilan, Batangas City	425-0139	bsu.alangilan@g.bastateu-edu.ph	2
1	Pablo Borbon Main Campus	Batangas, Batangas City	779-8400	bsu.pb@g.bastateu-edu.ph	1
4	Malvar Campus	Malvar, Batangas	425-1839	bsu.malvar@g.bastateu-edu.ph	4
3	Lipa Campus	Lipa, Batangas	425-1339	bsu.lipa@g.bastateu-edu.ph	3
\.


--
-- Data for Name: csd_officer_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.csd_officer_table (csd_officer_id, csd_officer_name, csd_officer_email, csd_officer_phone, csd_officer_password) FROM stdin;
1	Vaberlie Garcia	csd.bsu@g.bastate-u.edu.ph	555-012-3456	$2b$10$riXKV.2jhLFcKdqhPO7YfOZZ3q5lIu8CpKBReAU949./m1LE6Jy3q
2	Vaberlie Garcia	csd.bsu@g.batstate-u.edu.ph	555-012-3456	$2b$10$4hIqdo6KJx2Qkt7EibbI7OBVy1VYhWNBeEVwdmxQ8BZYTXW94KRMe
\.


--
-- Data for Name: file_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.file_table (file_id, file_name, file_extension, record_data_id) FROM stdin;
\.


--
-- Data for Name: instrument_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instrument_table (instrument_id, name, status, date_posted) FROM stdin;
10373498	sadasdasd	Active	2024-03-20
\.


--
-- Data for Name: notification_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification_table (unit_id, notification_date, message) FROM stdin;
\.


--
-- Data for Name: record_data_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_data_table (record_data_id, record_date, record_status, record_id, unit_id, request_id) FROM stdin;
RD59805	2024-03-20	For Approval	ID277697	U56739	\N
RD26020	2024-03-20	For Approval	ID277697	U56739	RQ45500
\.


--
-- Data for Name: record_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_table (record_id, record_name, sdg_id, instrument_id, record_status) FROM stdin;
ID277697	123123	SDG3	10373498	active
ID423075	1323	SDG3	10373498	active
ID352815	1	SDG3	10373498	active
\.


--
-- Data for Name: record_value_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_value_table (record_value_id, record_data_id, value, record_id) FROM stdin;
RV13355	RD59805	2	ID277697
RV84627	RD59805	2	ID423075
RV6071	RD26020	2	ID277697
RV17565	RD26020	2	ID423075
\.


--
-- Data for Name: request_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_table (request_id, request_title, request_description, start_date, due_date, instrument_id) FROM stdin;
RQ45500	123123123123123123	123123123	2024-03-20	2024-03-29	10373498
RQ86345	123	123123	2024-03-20	2024-03-20	10373498
RQ88716	123	123123	2024-03-20	2024-03-28	10373498
RQ64463	2312	3123123	2024-03-18	2024-02-27	10373498
RQ66019	32423	4234234	2024-04-02	2024-03-21	10373498
\.


--
-- Data for Name: sdg_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sdg_table (sdg_id, sdg_no, sdg_name, sdg_description) FROM stdin;
SDG1	1	No Poverty	End poverty in all its forms everywhere.
SDG2	2	Zero Hunger	End hunger, achieve food security and improved nutrition and promote sustainable agriculture.
SDG3	3	Good Health and Well-being	Ensure healthy lives and promote well-being for all at all ages.
SDG4	4	Quality Education	Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.
SDG5	5	Gender Equality	Achieve gender equality and empower all women and girls.
SDG6	6	Clean Water and Sanitation	Ensure availability and sustainable management of water and sanitation for all.
SDG7	7	Affordable and Clean Energy	Ensure access to affordable, reliable, sustainable and modern energy for all.
SDG8	8	Decent Work and Economic Growth	Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.
SDG9	9	Industry, Innovation, and Infrastructure	Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.
SDG10	10	Reduced Inequality	Reduce inequality within and among countries.
SDG11	11	Sustainable Cities and Communities	Make cities and human settlements inclusive, safe, resilient and sustainable.
SDG12	12	Responsible Consumption and Production	Ensure sustainable consumption and production patterns.
SDG13	13	Climate Action	Take urgent action to combat climate change and its impacts.
SDG14	14	Life Below Water	Conserve and sustainably use the oceans, seas and marine resources for sustainable development.
SDG15	15	Life on Land	Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.
SDG16	16	Peace, Justice, and Strong Institutions	Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.
SDG17	17	Partnerships for the Goals	Strengthen the means of implementation and revitalize the global partnership for sustainable development.
\.


--
-- Data for Name: sdo_officer_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sdo_officer_table (sdo_officer_id, sdo_officer_name, sdo_officer_email, sdo_officer_phone, sdo_officer_password, campus_id) FROM stdin;
SD440568	SD Main Campus	sd.main@example.com	09272626121	$2b$10$Y38peJdxOe5PwDu6B/I5Xuq3pVJZNG331x9Z9RR5.xOsVBFFqUT5a	1
SD544496	SD Alangilan Campus	sd.alangilan@example.com	09272626122	$2b$10$QEeSd.syeHYUKg8HK00DxeldZh7rUTzskIHPG9eV4vi2pg5pBSDXm	2
SD920022	SD Lipa Campus	sd.lipa@example.com	09272626123	$2b$10$.KMd5IeBCONksFo/Vj6jouqHldLj5XqLsTBH5L6QX2cJg7S/TB6fi	3
SD911548	SD Malvar Campus	sd.malvar@example.com	09272626124	$2b$10$U66uLPMQh9diXqzz5HyGyOyOqaVzbnsfrs5V/M9.KoAY7aN4JGxve	4
SD34290	SD Nasugbu Campus	sd.nasugbu@example.com	09272626125	$2b$10$Wdz4cEcYm4CDxYQ3VlFZGevyNLLfWcKO3QLe4ZQcFasPAkoDQbXJC	5
\.


--
-- Data for Name: tag_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag_table (tag_id, record_id, unit_id) FROM stdin;
24	ID277697	U87661
25	ID277697	62605
26	ID277697	68023
27	ID423075	62605
28	ID423075	67796
29	ID423075	U56739
30	ID352815	U87661
31	ID277697	57930
32	ID277697	U56739
33	ID277697	67796
\.


--
-- Data for Name: unit_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.unit_table (unit_id, unit_name, unit_address, unit_phone, unit_email, unit_password, sdo_officer_id, campus_id, status) FROM stdin;
U87661	CABEIHM - Main Campus	Pablo Borbon Main Campus	09612115718	cabeihm.main@example.com	$2b$10$UmOLuBJIj.KVqW.9zVMFJO46RyLLgAGJw0chdSt2lEiC2ie3cylk6	SD544496	1	f
57930	asdasd	Pablo Borbon Main Campus	asd	dyasmir7722@gmail.com	$2b$10$13/NpnERNbWkY4VZVEhspO1w5I5BPgLC7LIHB29W7Xeu4GVykG7Z2	SD440568	1	t
62605	3123	San Juan Campus	3123123	12gmail.com	$2b$10$qcaH47nFL5MhL3T6WpWe2uIcNSp3ZoczG.DzfeKkll0deMvFyfF3O	SD440568	8	t
67796	dyasmir	Lobo Campus	09817161	justmyrd.gutierrez@gmail.com	$2b$10$lg4kPITex2qrxXbEiBsrYuQKTiCCKMgcSo8EbyIeF0QagbE3Qxkh2	SD544496	10	\N
68023	asdasd1	San Juan Campus	123	11@gma.com	$2b$10$0fn5I4LGT9Wa/H1BdKib5O9MvQKKAFlpglYVYnVJqR2U3oOqj6LKm	SD440568	8	\N
U56739	CICS - Alangilan Campus	Alangilan Campus	09562281625	cics.alangilan@example.com	$2b$10$Of9wikd.a4nZ76Wg1TEJKeTlwrct2jWK/4SoMj0crhljMMB.HpHLe	SD544496	2	t
\.


--
-- Name: annual_reports_annual_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.annual_reports_annual_report_id_seq', 9, true);


--
-- Name: file_table_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_table_file_id_seq', 1, false);


--
-- Name: tag_table_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_table_tag_id_seq', 33, true);


--
-- Name: annual_reports annual_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annual_reports
    ADD CONSTRAINT annual_reports_pkey PRIMARY KEY (annual_report_id);


--
-- Name: campus_table campus_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campus_table
    ADD CONSTRAINT campus_table_pkey PRIMARY KEY (campus_id);


--
-- Name: csd_officer_table csd_officer_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.csd_officer_table
    ADD CONSTRAINT csd_officer_table_pkey PRIMARY KEY (csd_officer_id);


--
-- Name: file_table file_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file_table
    ADD CONSTRAINT file_table_pkey PRIMARY KEY (file_id);


--
-- Name: instrument_table instrument_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instrument_table
    ADD CONSTRAINT instrument_table_pkey PRIMARY KEY (instrument_id);


--
-- Name: record_data_table record_data_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_data_table
    ADD CONSTRAINT record_data_table_pkey PRIMARY KEY (record_data_id);


--
-- Name: record_table record_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_table
    ADD CONSTRAINT record_table_pkey PRIMARY KEY (record_id);


--
-- Name: record_value_table record_value_table_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_value_table
    ADD CONSTRAINT record_value_table_pkey1 PRIMARY KEY (record_value_id);


--
-- Name: request_table request_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_table
    ADD CONSTRAINT request_table_pkey PRIMARY KEY (request_id);


--
-- Name: sdg_table sdg_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sdg_table
    ADD CONSTRAINT sdg_table_pkey PRIMARY KEY (sdg_id);


--
-- Name: sdo_officer_table sdo_officer_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sdo_officer_table
    ADD CONSTRAINT sdo_officer_table_pkey PRIMARY KEY (sdo_officer_id);


--
-- Name: tag_table tag_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_table
    ADD CONSTRAINT tag_table_pkey PRIMARY KEY (tag_id);


--
-- Name: unit_table unit_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_pkey PRIMARY KEY (unit_id);


--
-- Name: annual_reports annual_reports_sdo_officer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annual_reports
    ADD CONSTRAINT annual_reports_sdo_officer_id_fkey FOREIGN KEY (sdo_officer_id) REFERENCES public.sdo_officer_table(sdo_officer_id);


--
-- Name: file_table file_table_record_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file_table
    ADD CONSTRAINT file_table_record_data_id_fkey FOREIGN KEY (record_data_id) REFERENCES public.record_data_table(record_data_id);


--
-- Name: sdo_officer_table fk_campus_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sdo_officer_table
    ADD CONSTRAINT fk_campus_id FOREIGN KEY (campus_id) REFERENCES public.campus_table(campus_id);


--
-- Name: record_value_table fk_record_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_value_table
    ADD CONSTRAINT fk_record_id FOREIGN KEY (record_id) REFERENCES public.record_table(record_id) ON DELETE CASCADE;


--
-- Name: record_data_table fk_request_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_data_table
    ADD CONSTRAINT fk_request_id FOREIGN KEY (request_id) REFERENCES public.request_table(request_id);


--
-- Name: notification_table notification_table_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_table
    ADD CONSTRAINT notification_table_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.unit_table(unit_id);


--
-- Name: record_data_table record_data_table_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_data_table
    ADD CONSTRAINT record_data_table_record_id_fkey FOREIGN KEY (record_id) REFERENCES public.record_table(record_id);


--
-- Name: record_data_table record_data_table_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_data_table
    ADD CONSTRAINT record_data_table_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.unit_table(unit_id);


--
-- Name: record_table record_table_instrument_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_table
    ADD CONSTRAINT record_table_instrument_id_fkey FOREIGN KEY (instrument_id) REFERENCES public.instrument_table(instrument_id);


--
-- Name: record_table record_table_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_table
    ADD CONSTRAINT record_table_record_id_fkey FOREIGN KEY (record_id) REFERENCES public.record_table(record_id) ON DELETE CASCADE;


--
-- Name: record_value_table record_value_table_record_data_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record_value_table
    ADD CONSTRAINT record_value_table_record_data_id_fkey1 FOREIGN KEY (record_data_id) REFERENCES public.record_data_table(record_data_id);


--
-- Name: request_table request_table_instrument_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_table
    ADD CONSTRAINT request_table_instrument_id_fkey FOREIGN KEY (instrument_id) REFERENCES public.instrument_table(instrument_id);


--
-- Name: tag_table tag_table_record_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_table
    ADD CONSTRAINT tag_table_record_id_fkey FOREIGN KEY (record_id) REFERENCES public.record_table(record_id) ON DELETE CASCADE;


--
-- Name: tag_table tag_table_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_table
    ADD CONSTRAINT tag_table_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.unit_table(unit_id) ON DELETE CASCADE;


--
-- Name: unit_table unit_table_campus_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus_table(campus_id);


--
-- Name: unit_table unit_table_sdo_officer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_sdo_officer_id_fkey FOREIGN KEY (sdo_officer_id) REFERENCES public.sdo_officer_table(sdo_officer_id);


--
-- PostgreSQL database dump complete
--


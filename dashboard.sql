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
    unit_id character varying(25)
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
    sdg_id character varying(25)
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
-- Data for Name: annual_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.annual_reports (annual_report_id, annual_report_year, annual_report_file, sdo_officer_id) FROM stdin;
1	2023	1702088128522-annual_report_file.jpg	SD544496
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
72316	SDG4: MayaCredit_SoA_2d94c3ab04d444d08c3d4f69780f6370_2023NOV.pdf	pdf	RD13179
71098	SDG1: food1.png	png	RD47324
3797	SDG1: Download (3).png	png	RD87389
14974	SDG1: Baptismal-Proposal-Joel-Sangalang-Joel-Sangalang-Nov.25 (2).pdf	pdf	RD60518
98359	SDG1: 377152528_875760190753635_978756771922632862_n.jpg	jpg	RD29970
16651	SDG1: 377152528_875760190753635_978756771922632862_n.jpg	jpg	RD99372
59021	SDG1: 369557989_3732711163672491_876435480254407338_n.jpg	jpg	RD30876
63911	SDG1: MayaCredit_SoA_2d94c3ab04d444d08c3d4f69780f6370_2023NOV.pdf	pdf	RD76322
\.


--
-- Data for Name: instrument_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instrument_table (instrument_id, name, status, date_posted) FROM stdin;
10626763	Instrument #2	Active	2023-11-08
10538177	Instrument #3	Active	2023-10-17
10375928	nbbnnnmnb	Active	2023-12-11
10821693	Instrument #1	Inactive	2023-12-07
\.


--
-- Data for Name: notification_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification_table (unit_id, notification_date, message) FROM stdin;
U56739	2023-12-08	Nice work
U87661	2023-12-08	
U87661	2023-12-08	
U56739	2023-12-08	
U56739	2023-12-08	122
U56739	2023-12-08	123
U56739	2023-12-08	
U56739	2023-12-09	
U56739	2023-12-09	
U56739	2023-12-11	nice work guys, fuxk you
U56739	2023-12-11	adssdhjadkjadhkasd
\.


--
-- Data for Name: record_data_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_data_table (record_data_id, record_date, record_status, record_id, unit_id) FROM stdin;
RD13179	2023-12-08	Approved	ID384111	U87661
RD25058	2023-12-08	Approved	ID384212	U87661
RD62166	2023-12-08	Approved	ID384203	U56739
RD87389	2023-12-08	Approved	ID384103	U56739
RD60518	2023-12-08	Approved	ID384103	U56739
RD29970	2023-12-08	Approved	ID384103	U56739
RD99372	2023-12-09	For Approval	ID384152	U56739
RD39444	2023-12-09	For Approval	ID384103	U56739
RD76322	2023-12-09	Need Revision	ID384103	U56739
RD30876	2023-12-09	Need Revision	ID384103	U56739
RD54477	2023-12-11	Approved	ID291468	U56739
RD55795	2023-12-11	Approved	ID291468	U56739
RD47324	2023-12-08	Approved	ID384203	U56739
\.


--
-- Data for Name: record_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_table (record_id, record_name, sdg_id, instrument_id, record_status) FROM stdin;
ID384158	SDG 3 Question 1	SDG3	10626763	active
ID349794	jjj	SDG2	10375928	\N
ID384103	SDG 1 Question 3	SDG1	10821693	active
ID384204	SDG 1 Question 2	SDG1	10538177	active
ID384209	SDG 3 Question 1	SDG3	10538177	active
ID384211	SDG 3 Question 3	SDG3	10538177	active
ID384210	SDG 3 Question 2	SDG3	10538177	active
ID384212	SDG 4 Question 1	SDG4	10538177	active
ID384213	SDG 4 Question 2	SDG4	10538177	active
ID384216	SDG 5 Question 2	SDG5	10538177	active
ID384219	SDG 6 Question 2	SDG6	10538177	active
ID384231	SDG 10 Question 2	SDG10	10538177	active
ID384234	SDG 11 Question 2	SDG11	10538177	active
ID384236	SDG 12 Question 1	SDG12	10538177	active
ID384240	SDG 13 Question 2	SDG13	10538177	active
ID384244	SDG 14 Question 3	SDG14	10538177	active
ID384246	SDG 15 Question 2	SDG15	10538177	active
ID384249	SDG 16 Question 2	SDG16	10538177	active
ID384251	SDG 17 Question 1	SDG17	10538177	active
ID384176	SDG 9 Question 1	SDG9	10626763	active
ID291468	jjh	SDG1	10375928	\N
ID384207	SDG 2 Question 2	SDG2	10538177	active
ID384214	SDG 4 Question 3	SDG4	10538177	active
ID384218	SDG 6 Question 1	SDG6	10538177	active
ID384221	SDG 7 Question 1	SDG7	10538177	active
ID384232	SDG 10 Question 3	SDG10	10538177	active
ID384235	SDG 11 Question 3	SDG11	10538177	active
ID384238	SDG 12 Question 3	SDG12	10538177	active
ID384241	SDG 13 Question 3	SDG13	10538177	active
ID384243	SDG 14 Question 2	SDG14	10538177	active
ID384247	SDG 15 Question 3	SDG15	10538177	active
ID384250	SDG 16 Question 3	SDG16	10538177	active
ID384253	SDG 17 Question 3	SDG17	10538177	active
ID384161	SDG 4 Question 1	SDG4	10626763	active
ID314068	kj	SDG2	10375928	\N
ID384174	SDG 8 Question 2	SDG8	10626763	active
ID384194	SDG 15 Question 1	SDG15	10626763	active
ID384157	SDG 2 Question 3	SDG2	10626763	active
ID384199	SDG 16 Question 3	SDG16	10626763	active
ID384197	SDG 16 Question 1	SDG16	10626763	active
ID384187	SDG 12 Question 3	SDG12	10626763	active
ID384192	SDG 14 Question 2	SDG14	10626763	active
ID384102	SDG 1 Question 2	SDG1	10821693	active
ID384111	SDG 4 Question 2	SDG4	10821693	active
ID384112	SDG 4 Question 3	SDG4	10821693	active
ID384113	SDG 5 Question 1	SDG5	10821693	active
ID384115	SDG 5 Question 3	SDG5	10821693	active
ID384114	SDG 5 Question 2	SDG5	10821693	active
ID384116	SDG 6 Question 1	SDG6	10821693	active
ID384117	SDG 6 Question 2	SDG6	10821693	active
ID384220	SDG 6 Question 3	SDG6	10538177	active
ID384222	SDG 7 Question 2	SDG7	10538177	active
ID384223	SDG 7 Question 3	SDG7	10538177	active
ID384224	SDG 8 Question 1	SDG8	10538177	active
ID384225	SDG 8 Question 2	SDG8	10538177	active
ID384226	SDG 8 Question 3	SDG8	10538177	active
ID384227	SDG 9 Question 1	SDG9	10538177	active
ID384228	SDG 9 Question 2	SDG9	10538177	active
ID384230	SDG 10 Question 1	SDG10	10538177	active
ID384118	SDG 6 Question 3	SDG6	10821693	active
ID384119	SDG 7 Question 1	SDG7	10821693	active
ID384120	SDG 7 Question 2	SDG7	10821693	active
ID384121	SDG 7 Question 3	SDG7	10821693	active
ID384122	SDG 8 Question 1	SDG8	10821693	active
ID384123	SDG 8 Question 2	SDG8	10821693	active
ID384124	SDG 8 Question 3	SDG8	10821693	active
ID384125	SDG 9 Question 1	SDG9	10821693	active
ID384126	SDG 9 Question 2	SDG9	10821693	active
ID384127	SDG 9 Question 3	SDG9	10821693	active
ID384128	SDG 10 Question 1	SDG10	10821693	active
ID384129	SDG 10 Question 2	SDG10	10821693	active
ID384131	SDG 11 Question 1	SDG11	10821693	active
ID384132	SDG 11 Question 2	SDG11	10821693	active
ID384133	SDG 11 Question 3	SDG11	10821693	active
ID384130	SDG 10 Question 3	SDG10	10821693	active
ID384134	SDG 12 Question 1	SDG12	10821693	active
ID384135	SDG 12 Question 2	SDG12	10821693	active
ID384136	SDG 12 Question 3	SDG12	10821693	active
ID384137	SDG 13 Question 1	SDG13	10821693	active
ID384138	SDG 13 Question 2	SDG13	10821693	active
ID384139	SDG 13 Question 3	SDG13	10821693	active
ID384140	SDG 14 Question 1	SDG14	10821693	active
ID384141	SDG 14 Question 2	SDG14	10821693	active
ID384142	SDG 14 Question 3	SDG14	10821693	active
ID384143	SDG 15 Question 1	SDG15	10821693	active
ID384144	SDG 15 Question 2	SDG15	10821693	active
ID384146	SDG 16 Question 1	SDG16	10821693	active
ID384145	SDG 15 Question 3	SDG15	10821693	active
ID384147	SDG 16 Question 2	SDG16	10821693	active
ID384148	SDG 16 Question 3	SDG16	10821693	active
ID384149	SDG 17 Question 1	SDG17	10821693	active
ID384150	SDG 17 Question 2	SDG17	10821693	active
ID384151	SDG 17 Question 3	SDG17	10821693	active
ID384104	SDG 2 Question 1	SDG2	10821693	active
ID384168	SDG 6 Question 2	SDG6	10626763	inactive
ID384180	SDG 10 Question 2	SDG10	10626763	active
ID384182	SDG 11 Question 1	SDG11	10626763	active
ID384184	SDG 11 Question 3	SDG11	10626763	active
ID384183	SDG 11 Question 2	SDG11	10626763	active
ID384155	SDG 2 Question 1	SDG2	10626763	active
ID384185	SDG 12 Question 1	SDG12	10626763	active
ID384189	SDG 13 Question 2	SDG13	10626763	active
ID384181	SDG 10 Question 3	SDG10	10626763	active
ID384191	SDG 14 Question 1	SDG14	10626763	active
ID384190	SDG 13 Question 3	SDG13	10626763	active
ID384188	SDG 13 Question 1	SDG13	10626763	active
ID384193	SDG 14 Question 3	SDG14	10626763	active
ID384153	SDG 1 Question 2	SDG1	10626763	active
ID384200	SDG 17 Question 1	SDG17	10626763	inactive
ID384172	SDG 7 Question 3	SDG7	10626763	active
ID384162	SDG 4 Question 2	SDG4	10626763	active
ID384195	SDG 15 Question 2	SDG15	10626763	active
ID384196	SDG 15 Question 3	SDG15	10626763	active
ID384159	SDG 3 Question 2	SDG3	10626763	active
ID384163	SDG 4 Question 3	SDG4	10626763	active
ID384171	SDG 7 Question 2	SDG7	10626763	active
ID384201	SDG 17 Question 2	SDG17	10626763	active
ID384164	SDG 5 Question 1	SDG5	10626763	active
ID384165	SDG 5 Question 2	SDG5	10626763	active
ID384156	SDG 2 Question 2	SDG2	10626763	active
ID384178	SDG 9 Question 3	SDG9	10626763	active
ID384167	SDG 6 Question 1	SDG6	10626763	active
ID384166	SDG 5 Question 3	SDG5	10626763	active
ID384169	SDG 6 Question 3	SDG6	10626763	active
ID384170	SDG 7 Question 1	SDG7	10626763	active
ID384173	SDG 8 Question 1	SDG8	10626763	active
ID384177	SDG 9 Question 2	SDG9	10626763	active
ID384152	SDG 1 Question 1	SDG1	10626763	active
ID384160	SDG 3 Question 3	SDG3	10626763	active
ID384186	SDG 12 Question 2	SDG12	10626763	active
ID384154	SDG 1 Question 3	SDG1	10626763	active
ID384179	SDG 10 Question 1	SDG10	10626763	active
ID345997	h	SDG1	10375928	\N
ID384175	SDG 8 Question 3	SDG8	10626763	active
ID384203	SDG 1 Question 1	SDG1	10538177	active
ID384205	SDG 1 Question 3	SDG1	10538177	active
ID384206	SDG 2 Question 1	SDG2	10538177	active
ID384208	SDG 2 Question 3	SDG2	10538177	active
ID384215	SDG 5 Question 1	SDG5	10538177	active
ID384217	SDG 5 Question 3	SDG5	10538177	active
ID384229	SDG 9 Question 3	SDG9	10538177	active
ID384233	SDG 11 Question 1	SDG11	10538177	active
ID384237	SDG 12 Question 2	SDG12	10538177	active
ID384239	SDG 13 Question 1	SDG13	10538177	active
ID384242	SDG 14 Question 1	SDG14	10538177	active
ID384245	SDG 15 Question 1	SDG15	10538177	active
ID384248	SDG 16 Question 1	SDG16	10538177	active
ID384252	SDG 17 Question 2	SDG17	10538177	active
ID384101	SDG 1 Question 1	SDG1	10821693	active
ID384107	SDG 3 Question 1	SDG3	10821693	active
ID384109	SDG 3 Question 3	SDG3	10821693	active
ID384110	SDG 4 Question 1	SDG4	10821693	active
ID384105	SDG 2 Question 2	SDG2	10821693	active
ID384106	SDG 2 Question 3	SDG2	10821693	active
ID384108	SDG 3 Question 2	SDG3	10821693	active
ID384202	SDG 17 Question 3	SDG17	10626763	active
ID384198	SDG 16 Question 2	SDG16	10626763	active
ID856510	n	SDG1	10375928	\N
\.


--
-- Data for Name: record_value_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_value_table (record_value_id, record_data_id, value, record_id) FROM stdin;
RV60375	RD13179	3	ID384111
RV33968	RD13179	1	ID384112
RV89737	RD13179	3	ID384110
RV66335	RD25058	12	ID384212
RV73745	RD25058	3	ID384213
RV51263	RD25058	333	ID384214
RV10804	RD47324	23	ID384203
RV24909	RD47324	3	ID384205
RV66331	RD47324	2	ID384204
RV19888	RD62166	5	ID384203
RV32424	RD62166	2	ID384205
RV65303	RD62166	4	ID384204
RV29570	RD87389	145	ID384103
RV31132	RD87389	12	ID384102
RV39639	RD87389	144	ID384101
RV73055	RD60518	1	ID384103
RV18826	RD60518	1	ID384102
RV50429	RD60518	1	ID384101
RV15661	RD29970	1	ID384103
RV73089	RD29970	1	ID384102
RV82985	RD29970	1	ID384101
RV38550	RD99372	3	ID384152
RV53752	RD99372	1	ID384153
RV78000	RD99372	3123	ID384154
RV55810	RD39444	4	ID384103
RV3644	RD39444	512	ID384102
RV27556	RD39444	56	ID384101
RV29677	RD30876	3	ID384103
RV10876	RD30876	1111	ID384102
RV70742	RD30876	44	ID384101
RV98463	RD76322	3	ID384103
RV82412	RD76322	3	ID384102
RV56711	RD76322	12	ID384101
RV7099	RD55795	5	ID291468
RV10153	RD55795	3	ID345997
RV86517	RD55795	6	ID856510
RV29653	RD54477	4	ID291468
RV43420	RD54477	23	ID345997
RV74700	RD54477	1	ID856510
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
SD34290	SD Nasugbu Campus	sd.nasugbu@example.com	09272626125	$2b$10$6GAqUsWjxGxjQjKDN18xwuFxsVGHj50FnUudo9jNfFCbKu6EWoXBq	5
SD440568	SD Main Campus	sd.main@example.com	09272626121	$2b$10$Y38peJdxOe5PwDu6B/I5Xuq3pVJZNG331x9Z9RR5.xOsVBFFqUT5a	1
SD544496	SD Alangilan Campus	sd.alangilan@example.com	09272626122	$2b$10$QEeSd.syeHYUKg8HK00DxeldZh7rUTzskIHPG9eV4vi2pg5pBSDXm	2
SD920022	SD Lipa Campus	sd.lipa@example.com	09272626123	$2b$10$.KMd5IeBCONksFo/Vj6jouqHldLj5XqLsTBH5L6QX2cJg7S/TB6fi	3
SD911548	SD Malvar Campus	sd.malvar@example.com	09272626124	$2b$10$U66uLPMQh9diXqzz5HyGyOyOqaVzbnsfrs5V/M9.KoAY7aN4JGxve	4
\.


--
-- Data for Name: unit_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.unit_table (unit_id, unit_name, unit_address, unit_phone, unit_email, unit_password, sdo_officer_id, campus_id, sdg_id) FROM stdin;
U56739	CICS - Alangilan Campus	Alangilan Campus	09562281625	cics.alangilan@example.com	$2b$10$Of9wikd.a4nZ76Wg1TEJKeTlwrct2jWK/4SoMj0crhljMMB.HpHLe	SD544496	2	SDG1
U87661	CABEIHM - Main Campus	Mabini Campus	09612115718	cabeihm.main@example.com	$2b$10$UmOLuBJIj.KVqW.9zVMFJO46RyLLgAGJw0chdSt2lEiC2ie3cylk6	SD544496	9	SDG4
\.


--
-- Name: annual_reports_annual_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.annual_reports_annual_report_id_seq', 1, true);


--
-- Name: file_table_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_table_file_id_seq', 1, false);


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
-- Name: unit_table unit_table_campus_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus_table(campus_id);


--
-- Name: unit_table unit_table_sdg_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_sdg_id_fkey FOREIGN KEY (sdg_id) REFERENCES public.sdg_table(sdg_id);


--
-- Name: unit_table unit_table_sdo_officer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_sdo_officer_id_fkey FOREIGN KEY (sdo_officer_id) REFERENCES public.sdo_officer_table(sdo_officer_id);


--
-- PostgreSQL database dump complete
--


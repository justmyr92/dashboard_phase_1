--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

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
4	Malvar Campus	Malvar, Batangas	425-1839	bsu.malvar@g.bastateu-edu.ph	4
3	Lipa Campus	Lipa, Batangas	425-1339	bsu.lipa@g.bastateu-edu.ph	3
1	Pablo Borbon Campus	Batangas, Batangas City	779-8400	bsu.pb@g.bastateu-edu.ph	1
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
10841724	Research on poverty	Active	2024-04-01
10601034	Financial aid to low-income students	Active	2024-04-01
10373498	sadasdasd	Inactive	2024-03-20
10288279	Financial aid to low-income students	Active	2024-04-01
10696998	Financial aid to low-income students	Active	2024-04-01
10024929	University anti-poverty programmes	Active	2024-04-01
10111379	University anti-poverty programmes	Active	2024-04-01
10477543	University anti-poverty programmes	Active	2024-04-01
10022650	University anti-poverty programmes	Active	2024-04-01
10250099	University anti-poverty programmes	Active	2024-04-01
10904952	University anti-poverty programmes	Active	2024-04-01
10586614	Community anti-poverty programmes	Active	2024-04-01
10816190	Community anti-poverty programmes	Active	2024-04-01
10918849	Community anti-poverty programmes	Active	2024-04-01
10032021	Policy addressing poverty	Active	2024-04-01
10837634	Research on hunger	Active	2024-04-01
10777355	Campus food waste	Active	2024-04-01
10881096	Student and employee hunger	Active	2024-04-01
10841410	Student and employee hunger	Active	2024-04-01
10947693	Student and employee hunger	Active	2024-04-01
10654933	Student and employee hunger	Active	2024-04-01
10115134	Student and employee hunger	Active	2024-04-01
10029222	National Hunger	Active	2024-04-01
10051211	National Hunger	Active	2024-04-01
10513859	National Hunger	Active	2024-04-01
10594673	National Hunger	Active	2024-04-01
10381406	Research on Health and Well-Being	Active	2024-04-01
10272449	Collaborations and health services	Active	2024-04-01
10661513	Collaborations and health services	Active	2024-04-01
10429404	Collaborations and health services	Active	2024-04-01
10881057	Collaborations and health services	Active	2024-04-01
10338269	Collaborations and health services	Active	2024-04-01
10955289	Collaborations and health services	Active	2024-04-01
10515836	Collaborations and health services	Active	2024-04-01
10455372	Research on early years and lifelong learning education	Active	2024-04-01
10157814	Graduates	Active	2024-04-01
10279679	Graduates	Active	2024-04-01
10829294	Lifelong Learning Measures	Active	2024-04-01
10748473	Lifelong Learning Measures	Active	2024-04-01
10991609	Lifelong Learning Measures	Active	2024-04-01
10982639	Lifelong Learning Measures	Active	2024-04-01
10596319	Lifelong Learning Measures	Active	2024-04-01
10329225	Lifelong Learning Measures	Active	2024-04-01
10475480	Research on gender equality	Active	2024-04-01
10160945	First-Generation Female Students	Active	2024-04-01
10296213	Employment Practice	Active	2024-04-01
10812225	Tracking Access Measures of Students and Employees	Active	2024-04-01
10320887	Tracking Access Measures of Students and Employees	Active	2024-04-01
10875761	Tracking Access Measures of Students and Employees	Active	2024-04-01
10689355	Proportion of women receiving degrees	Active	2024-04-01
10345751	Women’s progress measures for students and employees	Active	2024-04-01
10026232	Women’s progress measures for students and employees	Active	2024-04-01
10745619	Functional GAD Mechanisms	Active	2024-04-01
10070683	Functional GAD Mechanisms	Active	2024-04-01
10110187	Functional GAD Mechanisms	Active	2024-04-01
10424134	GAD Budget Allocation and Utilization	Active	2024-04-01
10361323	GAD Advocacies	Active	2024-04-01
10032763	GAD Advocacies	Active	2024-04-01
10897317	GAD Advocacies	Active	2024-04-01
10076972	Gender Equality in Instruction 	Active	2024-04-01
10949401	Gender Equality in Extension	Active	2024-04-01
10414600	Research on clean water and sanitation	Active	2024-04-01
10019051	Water consumption per capita	Active	2024-04-01
10343400	Water usage and care	Active	2024-04-01
10201105	Water usage and care	Active	2024-04-01
10505179	Water usage and care	Active	2024-04-01
10761432	Water usage and care	Active	2024-04-01
10157995	Water usage and care	Active	2024-04-01
10783001	Water Reuse	Active	2024-04-01
10110224	Water Reuse	Active	2024-04-01
10598701	Water in the community	Active	2024-04-01
10503199	Water in the community	Active	2024-04-01
10597867	Water in the community	Active	2024-04-01
10640812	Water in the community	Active	2024-04-01
10153743	Water in the community	Active	2024-04-01
10782832	Campus measures towards affordable and clean energy	Active	2024-04-01
10849556	Campus measures towards affordable and clean energy	Active	2024-04-01
10093977	Campus measures towards affordable and clean energy	Active	2024-04-01
10380795	Campus measures towards affordable and clean energy	Active	2024-04-01
10769780	Campus measures towards affordable and clean energy	Active	2024-04-01
10827194	Campus measures towards affordable and clean energy	Active	2024-04-01
10402679	Campus measures towards affordable and clean energy	Active	2024-04-01
10394892	Energy use density	Active	2024-04-01
10041089	Energy use density	Active	2024-04-01
10173494	Energy and the community	Active	2024-04-01
10006570	Energy and the community	Active	2024-04-01
10605397	Energy and the community	Active	2024-04-01
10584517	Energy and the community	Active	2024-04-01
10692736	Energy and the community	Active	2024-04-01
10942610	Research on economic growth and employment	Active	2024-04-01
10875311	Employment Practice	Active	2024-04-01
10982203	Employment Practice	Active	2024-04-01
10748397	Employment Practice	Active	2024-04-01
10054364	Employment Practice	Active	2024-04-01
10512790	Community employment	Active	2024-04-01
10168900	Research on industry, innovation and infrastructure	Active	2024-04-01
10328527	Campus Spin offs	Active	2024-04-01
10725787	Research income from industry and commerce	Active	2024-04-01
10171741	Industry, Innovation, and Infrastructure in the community	Active	2024-04-01
10575482	Research on Reduced Inequalities	Active	2024-04-01
10496958	Measures against discrimination on students and employees	Active	2024-04-01
10782748	Measures against discrimination on students and employees	Active	2024-04-01
10490895	Measures against discrimination on students and employees	Active	2024-04-01
10594808	Measures against discrimination on students and employees	Active	2024-04-01
10852496	Measures against discrimination on students and employees	Active	2024-04-01
10989410	Measures against discrimination on students and employees	Active	2024-04-01
10304372	Measures against discrimination on students and employees	Active	2024-04-01
10373616	Measures against discrimination on students and employees	Active	2024-04-01
10274428	Measures against discrimination on students and employees	Active	2024-04-01
10533791	Research on sustainable cities and communities	Active	2024-04-01
10101835	Support of arts and heritage	Active	2024-04-01
10565346	Support of arts and heritage	Active	2024-04-01
10377646	Support of arts and heritage	Active	2024-04-01
10318898	Support of arts and heritage	Active	2024-04-01
10979321	Support of arts and heritage	Active	2024-04-01
10847608	Support of arts and heritage	Active	2024-04-01
10743164	Support of arts and heritage	Active	2024-04-01
10643251	Expenditure on arts and heritage	Active	2024-04-01
10942168	Sustainable practices	Active	2024-04-01
10632352	Sustainable practices	Active	2024-04-01
10987593	Sustainable practices	Active	2024-04-01
10804421	Sustainable practices	Active	2024-04-01
10300790	Sustainable practices	Active	2024-04-01
10111493	Sustainable practices	Active	2024-04-01
10362870	Sustainable practices	Active	2024-04-01
10371617	Sustainable practices	Active	2024-04-01
10292112	Sustainable practices	Active	2024-04-01
10246578	Research on responsible consumption and production	Active	2024-04-01
10112043	Sustainable practices	Active	2024-04-01
10357277	Operational measures	Active	2024-04-01
10709019	Operational measures	Active	2024-04-01
10895986	Operational measures	Active	2024-04-01
10321457	Operational measures	Active	2024-04-01
10828561	Operational measures	Active	2024-04-01
10397811	Sustainable practices	Active	2024-04-01
10795949	Sustainable practices	Active	2024-04-01
10739828	Operational measures	Active	2024-04-01
10145401	Operational measures	Active	2024-04-01
10481105	Proportion of recycled waste	Active	2024-04-01
10025826	Publication of a sustainability report	Active	2024-04-01
10756879	Responsible consumption and production in the community	Active	2024-04-01
10573340	Research on Climate Action	Active	2024-04-01
10437298	Low-carbon energy use	Active	2024-04-01
10654786	Environmental education measures	Active	2024-04-01
10416185	Environmental education measures	Active	2024-04-01
10668343	Environmental education measures	Active	2024-04-01
10519727	Environmental education measures	Active	2024-04-01
10510640	Environmental education measures	Active	2024-04-01
10115564	Disaster risk reduction management	Active	2024-04-01
10023405	Disaster risk reduction management	Active	2024-04-01
10962242	Commitment to carbon neutral campus	Active	2024-04-01
10250683	Research on Life Below Water	Active	2024-04-01
10958212	Supporting aquatic ecosystems through education	Active	2024-04-01
10106180	Supporting aquatic ecosystems through education	Active	2024-04-01
10637518	Supporting aquatic ecosystems through education	Active	2024-04-01
10287848	Supporting aquatic ecosystems through action	Active	2024-04-01
10401022	Supporting aquatic ecosystems through action	Active	2024-04-01
10113726	Supporting aquatic ecosystems through action	Active	2024-04-01
10053292	Supporting aquatic ecosystems through action	Active	2024-04-01
10019637	Water sensitive waste disposal	Active	2024-04-01
10787122	Water sensitive waste disposal	Active	2024-04-01
10620592	Water sensitive waste disposal	Active	2024-04-01
10684728	Maintaining a local system	Active	2024-04-01
10686545	Maintaining a local system	Active	2024-04-01
10909675	Maintaining a local system	Active	2024-04-01
10191744	Maintaining a local system	Active	2024-04-01
10421202	Maintaining a local system	Active	2024-04-01
10132461	Research on Life on Land	Active	2024-04-01
10835471	Sustainable land practices	Active	2024-04-01
10691083	Proportion of endangered flora and fauna in the campus	Active	2024-04-01
10048537	Sustainable use of land	Active	2024-04-01
10187616	Sustainable use of land	Active	2024-04-01
10364070	Sustainable use of land	Active	2024-04-01
10060587	Sustaining biodiversity of the community	Active	2024-04-01
10447277	Research on Peace and Justice	Active	2024-04-01
10982725	University governance measures	Active	2024-04-01
10970257	University governance measures	Active	2024-04-01
10459621	University governance measures	Active	2024-04-01
10339248	University governance measures	Active	2024-04-01
10600284	University governance measures	Active	2024-04-01
10559928	University governance measures	Active	2024-04-01
10349389	Working with government	Active	2024-04-01
10513452	Working with government	Active	2024-04-01
10893611	Working with government	Active	2024-04-01
10619080	Working with government	Active	2024-04-01
10646087	University governance measures	Active	2024-04-01
10957759	Research into partnership for the goals	Active	2024-04-01
10948898	Relationships to support the goals	Active	2024-04-01
10364899	Relationships to support the goals	Active	2024-04-01
10988053	Relationships to support the goals	Active	2024-04-01
10802503	Relationships to support the goals	Active	2024-04-01
10936311	Relationships to support the goals	Active	2024-04-01
10894308	Publication of SDG Reports 	Active	2024-04-01
10202621	Education for the SDGs	Active	2024-04-01
10093128	Education for the SDGs	Active	2024-04-01
10228379	Education for the SDGs	Active	2024-04-01
10037707	Local and international partnerships	Active	2024-04-01
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
\.


--
-- Data for Name: record_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_table (record_id, record_name, sdg_id, instrument_id, record_status) FROM stdin;
ID735115	Published Research on Poverty WITHOUT co-author in Low or Lower-Middle income country	SDG1	10841724	active
ID417848	Published research with Co-Authored with Low or Lower-Middle income country	SDG1	10841724	active
ID187567	Low-income students who received only Private-Funded scholarship	SDG1	10601034	active
ID81501	Total No. of Low-Income students	SDG1	10601034	active
ID662387	Low-income students who received only Government-Funded scholarship	SDG1	10601034	active
ID628064	Low-income students who received Both Private and Government Funded scholarship	SDG1	10601034	active
ID245822	Books	SDG1	10288279	active
ID542635	Computers	SDG1	10288279	active
ID355644	School Supplies	SDG1	10288279	active
ID881716	Other low income support for students	SDG1	10696998	active
ID504409	Total Admitted Students	SDG1	10024929	active
ID98599	Number of low-income admitted students	SDG1	10024929	active
ID859937	No. of PPAs that support low-income students	SDG1	10111379	active
ID818346	No. of PPAs that support low-income students	SDG1	10477543	active
ID998882	No. of Student Assistant (Low-Income)	SDG1	10022650	active
ID220468	Number of Student Assistant	SDG1	10022650	active
ID317590	Number of Student Assistant	SDG1	10250099	active
ID867250	No. of Student Assistant (Low-Income)	SDG1	10250099	active
ID737791	No. of Foreign Student from Low-Income Country	SDG1	10904952	active
ID206106	No. of Foreign Student from Low-Income country received financial support from the campus.	SDG1	10904952	active
ID653377	No. of assistance provided to local start-ups (except financial assistance)	SDG1	10586614	active
ID568772	No. of start-ups provided with financial assistance	SDG1	10816190	active
ID149032	No. of PPAs implemented to improve community access to basic services	SDG1	10918849	active
ID60515	Local	SDG1	10032021	active
ID765373	Regional	SDG1	10032021	active
ID732386	National	SDG1	10032021	active
ID844438	Global	SDG1	10032021	active
ID448399	Published Research (SCOPUS/Web Science)	SDG2	10837634	active
ID427600	Published Research (Other Peer-Reviewed)	SDG2	10837634	active
ID179787	Total Campus Population	SDG2	10777355	active
ID886402	Total Food Waste per Capita per Month (in kg)	SDG2	10777355	active
ID987587	No. of students who experience hunger	SDG2	10881096	active
ID724104	No. of Long-term Program in place on student food insecurity	SDG2	10841410	active
ID845157	Total No. of employees who experience hunger	SDG2	10947693	active
ID976232	Total No. of hunger intervention (PPA)	SDG2	10654933	active
ID268273	Total No. of PPAs for sustainable food choices	SDG2	10115134	active
ID108145	Total No. of Extension Activities that provide security knowledge to local farmers and producers	SDG2	10029222	active
ID353619	Total No. of Events provided for local farmers and food producers	SDG2	10051211	active
ID244824	No. of local farmers and producers who were given access to university facilities	SDG2	10513859	active
ID98525	Total No. of local producers whom the university purchased sustainable food	SDG2	10594673	active
ID979341	Published Research (Other Peer-Reviewed)	SDG3	10381406	active
ID103908	Published Research (SCOPUS/Web Science)	SDG3	10381406	active
ID9175	National	SDG3	10272449	active
ID995490	Local	SDG3	10272449	active
ID86566	Global	SDG3	10272449	active
ID186246	Total No. of Health Outreach Program (PPA)	SDG3	10661513	active
ID812087	Total No. of Approved Request w/ Free Access	SDG3	10429404	active
ID178379	No. of Sexual&Reproductive Health Care Services for students	SDG3	10881057	active
ID316221	No. of Sexual&Reproductive Health Care Services for employees	SDG3	10338269	active
ID471142	No. of mental health support for students and employees	SDG3	10955289	active
ID801557	Total no. of policy	SDG3	10515836	active
ID57318	Total no. of PPAs implemented in accordance to the policy	SDG3	10515836	active
ID613234	Published Research (SCOPUS/Web Science)	SDG4	10455372	active
ID529863	Published Research (Other Peer-Reviewed)	SDG4	10455372	active
ID659340	Do you have CTE?	SDG4	10157814	active
ID290482	No. of programs w/ licensure exam for the current year	SDG4	10157814	active
ID190594	No. of programs w/ passing rate above or equal to nat'l passing rate	SDG4	10157814	active
ID146159	No. of CTE programs 	SDG4	10279679	active
ID495058	No. of programs w/ passing rate above or equal to nat'l passing rate	SDG4	10279679	active
ID477281	Total no. of PPAs free access to general public	SDG4	10829294	active
ID561920	No. of educational events hosted open to general public	SDG4	10748473	active
ID616744	No. of vocational training events hosted open to general public	SDG4	10991609	active
ID850205	Total no. of education outreach activities beyond campus	SDG4	10982639	active
ID630210	Total no. of Policy	SDG4	10596319	active
ID993923	Total no. of PPAs implemented in accordance to the policy	SDG4	10596319	active
ID59733	No. of First year students	SDG4	10329225	active
ID854066	No. of first year -first gen students	SDG4	10329225	active
ID442190	Published Research (SCOPUS/Web Science)	SDG5	10475480	active
ID401224	Published Research (Other Peer-Reviewed)	SDG5	10475480	active
ID551079	No. of first year - first gen students	SDG5	10160945	active
ID855053	No. of first year - first gen - female students	SDG5	10160945	active
ID639305	Total no. of admission policy	SDG5	10812225	active
ID935065	Total number of other PPAs exclusively for women	SDG5	10320887	active
ID80685	Total number of PPAs to encourage women’s application in underrepresented subjects	SDG5	10875761	active
ID332650	% of female graduates	SDG5	10689355	active
ID278885	Total no. of policy	SDG5	10345751	active
ID807139	Total no. of Policy with PPAs	SDG5	10026232	active
ID203198	Points in the FAT	SDG5	10745619	active
ID397529	Total no. of discussions conducted in the campus by CODI	SDG5	10070683	active
ID204360	Do you have VAW Desk?	SDG5	10110187	active
ID890681	Do you have VAW Officer?	SDG5	10110187	active
ID398643	VAW Officer Name:	SDG5	10110187	active
ID963956	Total campus GAA utilized for gender mainstreaming	SDG5	10424134	active
ID741842	% of total campus GAA utilized for gender mainstreaming	SDG5	10424134	active
ID630682	Total amount of campus GAA	SDG5	10424134	active
ID800546	No. of CapDev sessions w/ IEC materials	SDG5	10361323	active
ID399755	No. of GAD observances w/ IEC materials	SDG5	10032763	active
ID922698	No. of books/ e-books	SDG5	10897317	active
ID430124	GenEd courses	SDG5	10076972	active
ID878183	No. of Integration	SDG5	10076972	active
ID620027	Total no. of extension PPAs integrated with gender perspective	SDG5	10949401	active
ID245715	Published Research (Other Peer-Reviewed)	SDG6	10414600	active
ID824957	Published Research (SCOPUS/Web Science)	SDG6	10414600	active
ID679401	Liters per day/pax	SDG6	10019051	active
ID666860	Does your campus have a wastewater/sewage treatment plant?	SDG6	10343400	active
ID780511	Total no. of processes to prevent polluted water	SDG6	10201105	active
ID422606	No. of Stations	SDG6	10505179	active
ID147898	No. of Buildings	SDG6	10505179	active
ID910662	Total no. of building standards applied to minimize water use	SDG6	10761432	active
ID760730	No. of Building Standards	SDG6	10157995	active
ID928432	No. of policy	SDG6	10783001	active
ID151667	Treated water (in cubic meter)	SDG6	10110224	active
ID891174	Reused treated water (in cubic meter)	SDG6	10110224	active
ID136535	% of reused treated water (in cubic meter)	SDG6	10110224	active
ID481330	Total no. of water management educational opportunities	SDG6	10598701	active
ID295337	Total no. of PPAs related to promotion of conscious water usage	SDG6	10503199	active
ID72589	No. of off-campus program that supports water conservation	SDG6	10597867	active
ID171991	No. of sustainable water extraction technologies used in the campus	SDG6	10640812	active
ID781700	No. of programs partnered with local, regional, national or global movements on water security	SDG6	10153743	active
ID545237	Total no. of PPAs implemented in accordance to the policy	SDG7	10782832	active
ID29836	Total no. of policy	SDG7	10849556	active
ID840427	Total no. of PPAs implemented in accordance to the plan	SDG7	10093977	active
ID899523	Total no. of PPAs targeted to reduce carbon dioxide emissions	SDG7	10380795	active
ID393556	Year 2022 energy consumption (in kWh)	SDG7	10769780	active
ID121617	Year 2021 energy consumption (in kWh)	SDG7	10769780	active
ID346732	% of Energy Reduction Consumption	SDG7	10769780	active
ID161711	Undergone energy audit?	SDG7	10827194	active
ID254484	Total no. of PPAs implemented in accordance to the policy	SDG7	10402679	active
ID547330	Total no. of policy	SDG7	10402679	active
ID152564	Electricity consumption /month/pax (in kWh)	SDG7	10394892	active
ID183193	Total energy used from renewable resources	SDG7	10041089	active
ID544939	Total energy used	SDG7	10041089	active
ID212719	% of total energy used from renewable resources	SDG7	10041089	active
ID834767	Total no.  of PPAs for local community about energy efficiency and clean energy	SDG7	10173494	active
ID92100	No. of PPAs for he renewable energy pledge	SDG7	10006570	active
ID515178	Total no. of energy efficiency services provided for industry	SDG7	10605397	active
ID249877	Total no. of assistance provided in policy development for clean energy technology	SDG7	10584517	active
ID748649	Total no. of assistance provided to low-carbon innovation startups	SDG7	10692736	active
ID499156	Published Research (Other Peer-Reviewed)	SDG8	10942610	active
ID225383	Published Research (SCOPUS/Web Science)	SDG8	10942610	active
ID667470	Total no. of policy	SDG8	10875311	active
ID854672	Total no. of PPAs implemented in accordance to the policy	SDG8	10875311	active
ID460417	Total no. of PPAs implemented in accordance to the policy	SDG8	10982203	active
ID735351	Total no. of policy	SDG8	10982203	active
ID904172	Total no. of policy	SDG8	10748397	active
ID651396	Total no. of PPAs implemented in accordance to the policy	SDG8	10748397	active
ID650097	Total no. of policy	SDG8	10296213	active
ID914878	Total no. of PPAs implemented in accordance to the policy	SDG8	10296213	active
ID722138	Total no. of PPAs implemented in accordance to the policy	SDG8	10054364	active
ID924182	Total no. of policy	SDG8	10054364	active
ID182142	Total no. of extension PPAs related to community employment	SDG8	10512790	active
ID513073	Published Research (Other Peer-Reviewed)	SDG9	10168900	active
ID379606	Published Research (SCOPUS/Web Science)	SDG9	10168900	active
ID211340	Number of campus spin offs	SDG9	10328527	active
ID976917	Research income from industry and commerce (amount)	SDG9	10725787	active
ID130893	Total no. of extension PPAs related to industry, innovation and infrastructure	SDG9	10171741	active
ID865644	Published Research (SCOPUS/Web Science)	SDG10	10575482	active
ID402947	Published Research (Other Peer-Reviewed)	SDG10	10575482	active
ID284902	Total No. of policy	SDG10	10496958	active
ID266775	No. of PPAs implemented for non-discriminatory admissions policy	SDG10	10496958	active
ID32250	Total number of recruitment programs for student and staff underrepresented groups	SDG10	10782748	active
ID89715	Total No. of anti-harassment policy	SDG10	10490895	active
ID74305	Total No. of anti-discrimination policy	SDG10	10490895	active
ID579079	Existence of committee and/or offices	SDG10	10594808	active
ID213840	Total no. of implemented PPAs to support underrepresented groups	SDG10	10852496	active
ID658962	Total no. of facilities available in the campus for PWDs	SDG10	10989410	active
ID578596	Total no. of support services for PWDs	SDG10	10304372	active
ID738951	Total no. of access schemes for PWDs	SDG10	10373616	active
ID175099	Total No. of policy	SDG10	10274428	active
ID935060	Total no. of PPAs implemented for disability accomodation policy	SDG10	10274428	active
ID483199	Published Research (SCOPUS/Web Science)	SDG11	10533791	active
ID981591	Published Research (Other Peer-Reviewed)	SDG11	10533791	active
ID842883	Total no. of library visitors/guests per month	SDG11	10101835	active
ID288970	Total no. of museum/exhibition spaces visitors/guests per month	SDG11	10565346	active
ID869074	Total no. of events open to general public	SDG11	10377646	active
ID154038	Total no. of performances that contribute to arts and heritage	SDG11	10318898	active
ID424822	Choir	SDG11	10318898	active
ID721065	Theater	SDG11	10318898	active
ID577702	Band	SDG11	10318898	active
ID435428	Dance Group	SDG11	10318898	active
ID759425	Total no. of donated paintings	SDG11	10979321	active
ID877510	Regional	SDG11	10847608	active
ID807355	Local	SDG11	10847608	active
ID583762	National	SDG11	10847608	active
ID69806	International	SDG11	10847608	active
ID730523	Total number of other support for arts and heritage	SDG11	10743164	active
ID267264	Utilized fund for arts and heritage	SDG11	10643251	active
ID342428	Allocated fund for arts and heritage	SDG11	10643251	active
ID316645	Proportion of utilized fund for arts and heritage	SDG11	10643251	active
ID695702	Total no. of PPAs that promotes sustainable commuting	SDG11	10942168	active
ID395313	Total no. of PPAs that allow remote working	SDG11	10632352	active
ID860055	Total No. of Employees	SDG11	10987593	active
ID754342	Employee practicing sustainable working arrangement	SDG11	10987593	active
ID16948	% of employee practicing sustainable working arrangement	SDG11	10987593	active
ID933390	Total no. of PPAs for affordable housing for employees	SDG11	10804421	active
ID94272	Total no. of PPAs for affordable housing for students	SDG11	10300790	active
ID512888	no. of PPAs prioritizing pedestrian access in the campus	SDG11	10111493	active
ID331799	Total no. of policy/plan	SDG11	10371617	active
ID47658	Total no. of campus practices for sustainable standards of new builds	SDG11	10292112	active
ID544899	Published Research (SCOPUS/Web Science)	SDG12	10246578	active
ID862121	Published Research (Other Peer-Reviewed)	SDG12	10246578	active
ID911215	No. of ethical sourcing policy	SDG12	10357277	active
ID831046	Total no. of PPAs implemented for ethical sourcing policy	SDG12	10357277	active
ID233912	No. of waste disposal policy for hazardous waste	SDG12	10709019	active
ID597440	No. of PPAs implemented for waste disposal policy of hazardous waste	SDG12	10709019	active
ID796462	No. of waste disposal policy for landfill waste	SDG12	10895986	active
ID452162	No. of PPAs implemented for waste disposal policy of landfill waste	SDG12	10895986	active
ID948740	No. of minimization policy for plastic use	SDG12	10321457	active
ID98809	No. of PPAs implemented in minimizing plastic use	SDG12	10321457	active
ID121826	No. of waste disposal policy for landfill waste	SDG12	10828561	active
ID905363	No. of PPAs implemented for waste disposal policy of landfill waste	SDG12	10828561	active
ID672023	Total no. of collaborations with local authority for the affordable housing	SDG11	10795949	active
ID272439	No. of disposable policy for external suppliers	SDG12	10739828	active
ID25361	No. of PPAs implemented for disposable policy extended for external suppliers	SDG12	10739828	active
ID792495	No. of minimization policy for external suppliers	SDG12	10145401	active
ID639994	No. of PPAs implemented for minimization policy extended for external suppliers	SDG12	10145401	active
ID608523	Collected waste (in kg)	SDG12	10481105	active
ID598362	Recycled waste (in kg)	SDG12	10481105	active
ID998942	% of waste recycled	SDG12	10481105	active
ID887627	Campus sustainability report publication	SDG12	10025826	active
ID276914	Total no. of extension PPAs related to responsible consumption and production	SDG12	10756879	active
ID812369	Published Research (SCOPUS/Web Science)	SDG13	10573340	active
ID79350	Published Research (Other Peer-Reviewed)	SDG13	10573340	active
ID797969	Campus total energy used (in kWh)	SDG13	10573340	active
ID199961	% of campus total energy used from low carbon sources	SDG13	10573340	active
ID696991	Campus total energy used from low carbon sources	SDG13	10573340	active
ID194735	Campus total energy used (Fuel in Liters)	SDG13	10573340	active
ID244791	Campus total energy used from low carbon sources	SDG13	10573340	active
ID94706	% of campus total energy used from low carbon sources	SDG13	10437298	active
ID324109	Total no. of local education program on climate change	SDG13	10654786	active
ID683213	University Climate Action plan, shared with local government and local community groups	SDG13	10416185	active
ID740259	Total no. of partnerships with LGU in planning for climate change induced disasters	SDG13	10668343	active
ID340499	Total no. of partnerships w/ the LGU for risk warning and monitoring	SDG13	10519727	active
ID704421	Local	SDG13	10510640	active
ID781561	Institutional	SDG13	10510640	active
ID965848	Regional	SDG13	10510640	active
ID114626	National	SDG13	10510640	active
ID164937	International	SDG13	10510640	active
ID25072	Total no. of PPAs for DRRM	SDG13	10115564	active
ID356758	Total no. of available technology	SDG13	10023405	active
ID926080	Total no. of PPAs to be carbon neutral campus	SDG13	10962242	active
ID455534	Does your campus have a commitment to be a carbon neutral campus?	SDG13	10962242	active
ID827241	Published Research (SCOPUS/Web Science)	SDG14	10250683	active
ID481345	Published Research (Other Peer-Reviewed)	SDG14	10250683	active
ID582868	Total no. of educational programs on freshwater ecosystems for community	SDG14	10958212	active
ID374366	Total no. of educational programs on sustainable fisheries for the community	SDG14	10106180	active
ID307567	Total no. of educational programs addressing overfishing	SDG14	10637518	active
ID118047	Total no. of PPAs that promote conservation and sustainable utilization of the oceans	SDG14	10287848	active
ID567092	No. of policy for sustainable harvesting of aquatic ecosystems	SDG14	10401022	active
ID802304	Total no. of PPAs implemented in accordance to the policy	SDG14	10401022	active
ID659461	Total no. of PPAs that aim to maintain ecosystems and biodiversity	SDG14	10113726	active
ID819181	Total no. of technologies/practices that aims to minimize or prevent damage to aquatic ecosystems	SDG14	10053292	active
ID838837	Does your campus have water quality standards and guidelines for water discharges?	SDG14	10019637	active
ID975892	No. of PPAs for water discharge guidelines and standards	SDG14	10019637	active
ID942237	Does your campus have an action plan in place to reduce plastic waste?	SDG14	10787122	active
ID364995	No. of PPAs for plastic waste reduction plan	SDG14	10787122	active
ID208054	Total no. of monitoring PPAs for the health of nearby aquatic ecosystems	SDG14	10686545	active
ID23065	Total no. of programs offered towards good aquatic stewardship practices	SDG14	10909675	active
ID178169	Total no. of collaborations with local community to maintain shared aquatic ecosystems	SDG14	10191744	active
ID186669	No. of watershed management strategies	SDG14	10421202	active
ID161463	Published Research (Other Peer-Reviewed)	SDG15	10132461	active
ID433643	Published Research (SCOPUS/Web Science)	SDG15	10132461	active
ID497256	Total no. of sustainable land practices implemented	SDG15	10835471	active
ID639703	Total no. of endangered flora/fauna in the campus	SDG15	10691083	active
ID715839	Total no. of events organized/supported by the campus	SDG15	10048537	active
ID956588	No. of PPAs implemented to ensure that food in the university is sustainably farmed	SDG15	10187616	active
ID624361	No. of policy for sustainably farmed foods	SDG15	10187616	active
ID565219	Total no. of campus initiatives to maintain and extend current ecosystem biodiversity	SDG15	10364070	active
ID129351	Total no. of extension PPAs that sustain the biodiversity of the community	SDG15	10060587	active
ID903378	Published Research (Other Peer-Reviewed)	SDG16	10447277	active
ID807928	Published Research (SCOPUS/Web Science)	SDG16	10447277	active
ID274508	Total No. of students w/ external affiliation	SDG16	10970257	active
ID719768	Total No. of students	SDG16	10970257	active
ID696884	Percentage of students with external affiliation	SDG16	10970257	active
ID399046	No. of PPAs for identifying local and external stakeholders engagement	SDG16	10459621	active
ID338585	No. of policy for local and external stakeholders engagement	SDG16	10459621	active
ID36992	No. of PPAs implemented for academic freedom policy	SDG16	10600284	active
ID201371	Does your campus have a publication of campus financial data?	SDG16	10559928	active
ID605817	Regional	SDG16	10349389	active
ID480796	Local	SDG16	10349389	active
ID516185	National	SDG16	10349389	active
ID70172	Total no. of provided outreach and education to policy and lawmakers	SDG16	10513452	active
ID517551	Total no. of policy-focused research	SDG16	10893611	active
ID510719	Total no. of neutral platforms provided by the campus to discuss issues	SDG16	10619080	active
ID864264	No. of campus principles and commitments on organized crime, corruption and bribery	SDG16	10646087	active
ID948050	Published Research (SCOPUS/Web Science)	SDG17	10957759	active
ID187353	Published Research (Other Peer-Reviewed)	SDG17	10957759	active
ID553345	Government	SDG17	10948898	active
ID950606	Regional NGO	SDG17	10948898	active
ID588280	Total no. of cross-sectoral SDG dialogue initiated and/or participated	SDG17	10364899	active
ID798329	Total no. of international collaboration on SDG data gathering	SDG17	10988053	active
ID934845	Total no. of international collaboration for SDG best practice	SDG17	10802503	active
ID987301	Total no. of SDG projects in collaboration with NGOs	SDG17	10936311	active
ID305141	How many SDGs you have separate publication?	SDG17	10894308	active
ID62733	No. of implemented PPAs for the commitment on ESDGs	SDG17	10202621	active
ID916081	No. of specific course on sustainability	SDG17	10093128	active
ID817542	Total no. of educational outreach activities for the wider community	SDG17	10228379	active
ID258632	Local	SDG17	10037707	active
ID395980	International	SDG17	10037707	active
\.


--
-- Data for Name: record_value_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record_value_table (record_value_id, record_data_id, value, record_id) FROM stdin;
\.


--
-- Data for Name: request_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_table (request_id, request_title, request_description, start_date, due_date, instrument_id) FROM stdin;
RQ19970	Water	water consumptions. mains, deep well, and drinking water.	2024-04-02	2024-04-05	10343400
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
SD819138	SDO Alangilan	sdo.alangilan@g.batstate-u.edu.ph	2005	$2b$10$R3pT22vZfEp9UPmw0npZleJObUL6.OefC24wtXaZ9C9st6Qp/vjGa	2
SD729065	SDO JPLPC-Malvar	sdo.malvar@g.batstate-u.edu.ph		$2b$10$CpWg.7cYvfQx5xalpQdgIeoyGZ8PLm.r0EPjoLPA9pUgEtqS5aAQ6	4
SD162394	SDO ARASOF-Nasugbu	sdo.nasugbu@g.batstate-u.edu.ph		$2b$10$16UeTFv8y3K7vimSpThSOeQ1eYx/dHQKvURrYs8dYXjuYALcAl1z.	5
SD388051	SDO Pablo Borbon	sdo.pb@g.batstate-u.edu.ph	1883	$2b$10$JIN5f2imsX14NsWT9fBKmORUi3YQWlhfhiI5D1ydVGdIOby.zOtZi	1
SD672227	Dummy SDO	rafael.ramirez@g.batstate-u.edu.ph		$2b$10$qaz8bP2f25G9sc6f1amHWOz/VcU2WOlcxNIkT0EzjWtHUBu4xoT52	3
SD394679	SDO Lipa	sdo.lipa@g.batstate-u.edu.ph		$2b$10$Iz2c9uYq7Z2FgYnz8v8kFehWqf.PhD0AQOF991kRbWarbQ3vLmXhe	3
\.


--
-- Data for Name: tag_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag_table (tag_id, record_id, unit_id) FROM stdin;
\.


--
-- Data for Name: unit_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.unit_table (unit_id, unit_name, unit_address, unit_phone, unit_email, unit_password, sdo_officer_id, campus_id, status) FROM stdin;
82606	Resource Generation Office (RGO)	Pablo Borbon Campus		rgo.bsu@g.batstate-u.edu.ph	$2b$10$S4H1TmJbmLQUKBRKNmcZIux3uQTGezggNB40F.ZwTxZe4zq8xEZHu	SD388051	1	f
60918	Environmental Management Unit (EMU)	Pablo Borbon Campus	1331	emu.pb@g.batstate-u.edu.ph	$2b$10$3k/IZWlwDkdvQjiBQYRQmOSHDR5yU1qiTj5CAM7IzsiyqR1Vpp1hy	SD388051	1	f
8770	General Services Office (GSO)	Pablo Borbon Campus		gso.bsu@g.batstate-u.edu.ph	$2b$10$cfmY2juAK6JMtdi9thOt/OBlbbKWxWW55ZpMfnsrQpQrmu7MDOAci	SD388051	1	f
47330	SDO Lipa	Lipa Campus		23-06460@g.batstate-u.edu.ph	$2b$10$77sgYLmG7cv65yHho1ciHeHMrv87KI57WieLOq/SQeK2/1db0YcHe	SD672227	3	t
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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


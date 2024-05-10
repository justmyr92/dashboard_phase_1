PGDMP  /    +    	    
        |         	   dashboard    16.0    16.0 E               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    43005 	   dashboard    DATABASE     �   CREATE DATABASE dashboard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
    DROP DATABASE dashboard;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    5            �            1259    43006    annual_reports    TABLE     �   CREATE TABLE public.annual_reports (
    annual_report_id integer NOT NULL,
    annual_report_year character varying(4) NOT NULL,
    annual_report_file character varying(255),
    sdo_officer_id character varying(25) NOT NULL
);
 "   DROP TABLE public.annual_reports;
       public         heap    postgres    false    5            �            1259    43009 #   annual_reports_annual_report_id_seq    SEQUENCE     �   CREATE SEQUENCE public.annual_reports_annual_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.annual_reports_annual_report_id_seq;
       public          postgres    false    215    5                       0    0 #   annual_reports_annual_report_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.annual_reports_annual_report_id_seq OWNED BY public.annual_reports.annual_report_id;
          public          postgres    false    216            �            1259    43010    campus_table    TABLE       CREATE TABLE public.campus_table (
    campus_id character varying(25) NOT NULL,
    campus_name character varying(50),
    campus_address character varying(255),
    campus_phone character varying(25),
    campus_email character varying(50),
    sd_no integer
);
     DROP TABLE public.campus_table;
       public         heap    postgres    false    5            �            1259    43013    csd_officer_table    TABLE       CREATE TABLE public.csd_officer_table (
    csd_officer_id character varying(25) NOT NULL,
    csd_officer_name character varying(50),
    csd_officer_email character varying(50),
    csd_officer_phone character varying(25),
    csd_officer_password character varying(255)
);
 %   DROP TABLE public.csd_officer_table;
       public         heap    postgres    false    5            �            1259    43016 
   file_table    TABLE     �   CREATE TABLE public.file_table (
    file_id integer NOT NULL,
    file_name character varying(255),
    file_extension character varying(10),
    record_data_id character varying(25)
);
    DROP TABLE public.file_table;
       public         heap    postgres    false    5            �            1259    43019    file_table_file_id_seq    SEQUENCE     �   CREATE SEQUENCE public.file_table_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.file_table_file_id_seq;
       public          postgres    false    219    5                       0    0    file_table_file_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.file_table_file_id_seq OWNED BY public.file_table.file_id;
          public          postgres    false    220            �            1259    43020    instrument_table    TABLE       CREATE TABLE public.instrument_table (
    instrument_id integer NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(50),
    date_posted date,
    section text,
    sdg_id character varying(25),
    instrument_number integer
);
 $   DROP TABLE public.instrument_table;
       public         heap    postgres    false    5            �            1259    43023    notification_table    TABLE     �   CREATE TABLE public.notification_table (
    notification_date date NOT NULL,
    message text NOT NULL,
    sdo_officer_id character varying(25)
);
 &   DROP TABLE public.notification_table;
       public         heap    postgres    false    5            �            1259    43028    record_data_table    TABLE     �   CREATE TABLE public.record_data_table (
    record_data_id character varying(25) NOT NULL,
    record_date date,
    record_status character varying(50),
    sdo_officer_id character varying(25)
);
 %   DROP TABLE public.record_data_table;
       public         heap    postgres    false    5            �            1259    43031    record_table    TABLE     �   CREATE TABLE public.record_table (
    record_id character varying(25) NOT NULL,
    record_name text,
    sdg_id character varying(25),
    instrument_id integer,
    record_status character varying(55),
    rtype character varying(255)
);
     DROP TABLE public.record_table;
       public         heap    postgres    false    5            �            1259    43034    record_value_table    TABLE     �   CREATE TABLE public.record_value_table (
    record_value_id character varying(25) NOT NULL,
    record_data_id character varying(25),
    value character varying(255),
    record_id character varying(25)
);
 &   DROP TABLE public.record_value_table;
       public         heap    postgres    false    5            �            1259    43042 	   sdg_table    TABLE     �   CREATE TABLE public.sdg_table (
    sdg_id character varying(25) NOT NULL,
    sdg_no integer,
    sdg_name character varying(50),
    sdg_description character varying(255)
);
    DROP TABLE public.sdg_table;
       public         heap    postgres    false    5            �            1259    43045    sdo_officer_table    TABLE     9  CREATE TABLE public.sdo_officer_table (
    sdo_officer_id character varying(25) NOT NULL,
    sdo_officer_name character varying(50),
    sdo_officer_email character varying(50),
    sdo_officer_phone character varying(25),
    sdo_officer_password character varying(255),
    campus_id character varying(25)
);
 %   DROP TABLE public.sdo_officer_table;
       public         heap    postgres    false    5            �            1259    43205    toption    TABLE     �   CREATE TABLE public.toption (
    option_id integer NOT NULL,
    option_value character varying(255),
    record_id character varying(25)
);
    DROP TABLE public.toption;
       public         heap    postgres    false    5            �            1259    43204    toption_option_id_seq    SEQUENCE     �   CREATE SEQUENCE public.toption_option_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.toption_option_id_seq;
       public          postgres    false    230    5                       0    0    toption_option_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.toption_option_id_seq OWNED BY public.toption.option_id;
          public          postgres    false    229            �            1259    43052 
   unit_table    TABLE     v  CREATE TABLE public.unit_table (
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
    DROP TABLE public.unit_table;
       public         heap    postgres    false    5            L           2604    43057    annual_reports annual_report_id    DEFAULT     �   ALTER TABLE ONLY public.annual_reports ALTER COLUMN annual_report_id SET DEFAULT nextval('public.annual_reports_annual_report_id_seq'::regclass);
 N   ALTER TABLE public.annual_reports ALTER COLUMN annual_report_id DROP DEFAULT;
       public          postgres    false    216    215            M           2604    43058    file_table file_id    DEFAULT     x   ALTER TABLE ONLY public.file_table ALTER COLUMN file_id SET DEFAULT nextval('public.file_table_file_id_seq'::regclass);
 A   ALTER TABLE public.file_table ALTER COLUMN file_id DROP DEFAULT;
       public          postgres    false    220    219            N           2604    43208    toption option_id    DEFAULT     v   ALTER TABLE ONLY public.toption ALTER COLUMN option_id SET DEFAULT nextval('public.toption_option_id_seq'::regclass);
 @   ALTER TABLE public.toption ALTER COLUMN option_id DROP DEFAULT;
       public          postgres    false    230    229    230                      0    43006    annual_reports 
   TABLE DATA           r   COPY public.annual_reports (annual_report_id, annual_report_year, annual_report_file, sdo_officer_id) FROM stdin;
    public          postgres    false    215   �Z                 0    43010    campus_table 
   TABLE DATA           q   COPY public.campus_table (campus_id, campus_name, campus_address, campus_phone, campus_email, sd_no) FROM stdin;
    public          postgres    false    217   [                 0    43013    csd_officer_table 
   TABLE DATA           �   COPY public.csd_officer_table (csd_officer_id, csd_officer_name, csd_officer_email, csd_officer_phone, csd_officer_password) FROM stdin;
    public          postgres    false    218   Z\                 0    43016 
   file_table 
   TABLE DATA           X   COPY public.file_table (file_id, file_name, file_extension, record_data_id) FROM stdin;
    public          postgres    false    219   $]       	          0    43020    instrument_table 
   TABLE DATA           x   COPY public.instrument_table (instrument_id, name, status, date_posted, section, sdg_id, instrument_number) FROM stdin;
    public          postgres    false    221   q]       
          0    43023    notification_table 
   TABLE DATA           X   COPY public.notification_table (notification_date, message, sdo_officer_id) FROM stdin;
    public          postgres    false    222   h                 0    43028    record_data_table 
   TABLE DATA           g   COPY public.record_data_table (record_data_id, record_date, record_status, sdo_officer_id) FROM stdin;
    public          postgres    false    223   �h                 0    43031    record_table 
   TABLE DATA           k   COPY public.record_table (record_id, record_name, sdg_id, instrument_id, record_status, rtype) FROM stdin;
    public          postgres    false    224   Ci                 0    43034    record_value_table 
   TABLE DATA           _   COPY public.record_value_table (record_value_id, record_data_id, value, record_id) FROM stdin;
    public          postgres    false    225   ��                 0    43042 	   sdg_table 
   TABLE DATA           N   COPY public.sdg_table (sdg_id, sdg_no, sdg_name, sdg_description) FROM stdin;
    public          postgres    false    226   �                 0    43045    sdo_officer_table 
   TABLE DATA           �   COPY public.sdo_officer_table (sdo_officer_id, sdo_officer_name, sdo_officer_email, sdo_officer_phone, sdo_officer_password, campus_id) FROM stdin;
    public          postgres    false    227   �                 0    43205    toption 
   TABLE DATA           E   COPY public.toption (option_id, option_value, record_id) FROM stdin;
    public          postgres    false    230   ��                 0    43052 
   unit_table 
   TABLE DATA           �   COPY public.unit_table (unit_id, unit_name, unit_address, unit_phone, unit_email, unit_password, sdo_officer_id, campus_id, status) FROM stdin;
    public          postgres    false    228   ��                  0    0 #   annual_reports_annual_report_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.annual_reports_annual_report_id_seq', 9, true);
          public          postgres    false    216                       0    0    file_table_file_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.file_table_file_id_seq', 1, false);
          public          postgres    false    220                       0    0    toption_option_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.toption_option_id_seq', 14, true);
          public          postgres    false    229            P           2606    43061 "   annual_reports annual_reports_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.annual_reports
    ADD CONSTRAINT annual_reports_pkey PRIMARY KEY (annual_report_id);
 L   ALTER TABLE ONLY public.annual_reports DROP CONSTRAINT annual_reports_pkey;
       public            postgres    false    215            R           2606    43063    campus_table campus_table_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.campus_table
    ADD CONSTRAINT campus_table_pkey PRIMARY KEY (campus_id);
 H   ALTER TABLE ONLY public.campus_table DROP CONSTRAINT campus_table_pkey;
       public            postgres    false    217            T           2606    43065 (   csd_officer_table csd_officer_table_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.csd_officer_table
    ADD CONSTRAINT csd_officer_table_pkey PRIMARY KEY (csd_officer_id);
 R   ALTER TABLE ONLY public.csd_officer_table DROP CONSTRAINT csd_officer_table_pkey;
       public            postgres    false    218            V           2606    43067    file_table file_table_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.file_table
    ADD CONSTRAINT file_table_pkey PRIMARY KEY (file_id);
 D   ALTER TABLE ONLY public.file_table DROP CONSTRAINT file_table_pkey;
       public            postgres    false    219            X           2606    43069 &   instrument_table instrument_table_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.instrument_table
    ADD CONSTRAINT instrument_table_pkey PRIMARY KEY (instrument_id);
 P   ALTER TABLE ONLY public.instrument_table DROP CONSTRAINT instrument_table_pkey;
       public            postgres    false    221            Z           2606    43071 (   record_data_table record_data_table_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.record_data_table
    ADD CONSTRAINT record_data_table_pkey PRIMARY KEY (record_data_id);
 R   ALTER TABLE ONLY public.record_data_table DROP CONSTRAINT record_data_table_pkey;
       public            postgres    false    223            \           2606    43073    record_table record_table_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.record_table
    ADD CONSTRAINT record_table_pkey PRIMARY KEY (record_id);
 H   ALTER TABLE ONLY public.record_table DROP CONSTRAINT record_table_pkey;
       public            postgres    false    224            ^           2606    43075 +   record_value_table record_value_table_pkey1 
   CONSTRAINT     v   ALTER TABLE ONLY public.record_value_table
    ADD CONSTRAINT record_value_table_pkey1 PRIMARY KEY (record_value_id);
 U   ALTER TABLE ONLY public.record_value_table DROP CONSTRAINT record_value_table_pkey1;
       public            postgres    false    225            `           2606    43079    sdg_table sdg_table_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.sdg_table
    ADD CONSTRAINT sdg_table_pkey PRIMARY KEY (sdg_id);
 B   ALTER TABLE ONLY public.sdg_table DROP CONSTRAINT sdg_table_pkey;
       public            postgres    false    226            b           2606    43081 (   sdo_officer_table sdo_officer_table_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.sdo_officer_table
    ADD CONSTRAINT sdo_officer_table_pkey PRIMARY KEY (sdo_officer_id);
 R   ALTER TABLE ONLY public.sdo_officer_table DROP CONSTRAINT sdo_officer_table_pkey;
       public            postgres    false    227            f           2606    43210    toption toption_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.toption
    ADD CONSTRAINT toption_pkey PRIMARY KEY (option_id);
 >   ALTER TABLE ONLY public.toption DROP CONSTRAINT toption_pkey;
       public            postgres    false    230            d           2606    43085    unit_table unit_table_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_pkey PRIMARY KEY (unit_id);
 D   ALTER TABLE ONLY public.unit_table DROP CONSTRAINT unit_table_pkey;
       public            postgres    false    228            g           2606    43086 1   annual_reports annual_reports_sdo_officer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.annual_reports
    ADD CONSTRAINT annual_reports_sdo_officer_id_fkey FOREIGN KEY (sdo_officer_id) REFERENCES public.sdo_officer_table(sdo_officer_id);
 [   ALTER TABLE ONLY public.annual_reports DROP CONSTRAINT annual_reports_sdo_officer_id_fkey;
       public          postgres    false    227    4706    215            h           2606    43091 )   file_table file_table_record_data_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_table
    ADD CONSTRAINT file_table_record_data_id_fkey FOREIGN KEY (record_data_id) REFERENCES public.record_data_table(record_data_id);
 S   ALTER TABLE ONLY public.file_table DROP CONSTRAINT file_table_record_data_id_fkey;
       public          postgres    false    223    4698    219            p           2606    43096    sdo_officer_table fk_campus_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.sdo_officer_table
    ADD CONSTRAINT fk_campus_id FOREIGN KEY (campus_id) REFERENCES public.campus_table(campus_id);
 H   ALTER TABLE ONLY public.sdo_officer_table DROP CONSTRAINT fk_campus_id;
       public          postgres    false    227    4690    217            n           2606    43101    record_value_table fk_record_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.record_value_table
    ADD CONSTRAINT fk_record_id FOREIGN KEY (record_id) REFERENCES public.record_table(record_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.record_value_table DROP CONSTRAINT fk_record_id;
       public          postgres    false    224    4700    225            i           2606    43179    instrument_table fk_sdg_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.instrument_table
    ADD CONSTRAINT fk_sdg_id FOREIGN KEY (sdg_id) REFERENCES public.sdg_table(sdg_id);
 D   ALTER TABLE ONLY public.instrument_table DROP CONSTRAINT fk_sdg_id;
       public          postgres    false    221    4704    226            k           2606    43167 #   record_data_table fk_sdo_officer_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.record_data_table
    ADD CONSTRAINT fk_sdo_officer_id FOREIGN KEY (sdo_officer_id) REFERENCES public.sdo_officer_table(sdo_officer_id);
 M   ALTER TABLE ONLY public.record_data_table DROP CONSTRAINT fk_sdo_officer_id;
       public          postgres    false    227    223    4706            j           2606    43172 $   notification_table fk_sdo_officer_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.notification_table
    ADD CONSTRAINT fk_sdo_officer_id FOREIGN KEY (sdo_officer_id) REFERENCES public.sdo_officer_table(sdo_officer_id);
 N   ALTER TABLE ONLY public.notification_table DROP CONSTRAINT fk_sdo_officer_id;
       public          postgres    false    4706    227    222            l           2606    43126 ,   record_table record_table_instrument_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.record_table
    ADD CONSTRAINT record_table_instrument_id_fkey FOREIGN KEY (instrument_id) REFERENCES public.instrument_table(instrument_id);
 V   ALTER TABLE ONLY public.record_table DROP CONSTRAINT record_table_instrument_id_fkey;
       public          postgres    false    224    4696    221            m           2606    43131 (   record_table record_table_record_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.record_table
    ADD CONSTRAINT record_table_record_id_fkey FOREIGN KEY (record_id) REFERENCES public.record_table(record_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.record_table DROP CONSTRAINT record_table_record_id_fkey;
       public          postgres    false    224    224    4700            o           2606    43136 :   record_value_table record_value_table_record_data_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.record_value_table
    ADD CONSTRAINT record_value_table_record_data_id_fkey1 FOREIGN KEY (record_data_id) REFERENCES public.record_data_table(record_data_id);
 d   ALTER TABLE ONLY public.record_value_table DROP CONSTRAINT record_value_table_record_data_id_fkey1;
       public          postgres    false    223    4698    225            s           2606    43211    toption toption_record_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.toption
    ADD CONSTRAINT toption_record_id_fkey FOREIGN KEY (record_id) REFERENCES public.record_table(record_id);
 H   ALTER TABLE ONLY public.toption DROP CONSTRAINT toption_record_id_fkey;
       public          postgres    false    4700    224    230            q           2606    43156 $   unit_table unit_table_campus_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus_table(campus_id);
 N   ALTER TABLE ONLY public.unit_table DROP CONSTRAINT unit_table_campus_id_fkey;
       public          postgres    false    4690    228    217            r           2606    43161 )   unit_table unit_table_sdo_officer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.unit_table
    ADD CONSTRAINT unit_table_sdo_officer_id_fkey FOREIGN KEY (sdo_officer_id) REFERENCES public.sdo_officer_table(sdo_officer_id);
 S   ALTER TABLE ONLY public.unit_table DROP CONSTRAINT unit_table_sdo_officer_id_fkey;
       public          postgres    false    227    228    4706                  x������ � �         8  x�m��n�0���)x��0;�&�z��Eɵ���(�Y�q��}C����O3c(�#r��������Cp��dI�-�	1?��$\6�2�� !4���F+����"�W�ר�Y7t1�èf���UpUC=�}2[;XI�Tc�o���.���ۆ[��զ���^��s�7�mۓ�ܮ���M���p��oOA���-��\KǤul���4'	����������ј��FѾ彎L�$��y��{�6X�V�S���݄����E��*�)������q�����7�;dY�a�ű6'潉����.%         �   x���;�0  Й��j�)VE�V!.-�?Q~oo����C�BU�B����n䵄�n�g(x��FY-T��OmB���0�0����e_�|�SY�U⥧$�����?i�Q�]��G�ȝ���_��l�8����Y���Ƌ
!b/	��T��K޻�f����Y(p� ��\H7         =   x�33055���/�LNU�OSpL*N�2=�JR��4,4�
R�8A8�����̌+F��� ��      	   �
  x��[Ks��>ÿ�\V�y?��-k��7.+[��GjA�@i�_����$T��D��ozf��u��3��*��Pt�]�6�����]�Cu2���`�ų?~�n�_���Ym����U��/�2�}�9��}���7�n��ϋf�_m�u�B�"��4�
͘����N�W�#H�ŨT���uWl68<�c��Zg_�v�vC���Mh�.���G�Wa�M�d J
�=�V�r��Q���/�!tyW��r�]I�n��XPxxy�2�/�!�y5�����NgW�}յ�R�9*XDG�)��TI+��>�e�}�Єn����0)�@X�e*�H	�	�[a��N�J	
=��wu�)��_��MC���V֙e��@�I%�I�W��.ۛL�.���U՗]���_�sK
G-��M�!��޵�M5�����14a7t�wYl��i]n�:a�+�Jf���u�р@{%^I��i��Zd7�~ ��{ p TN	C`��.�s�7�-FN�E7jp�j��4��A�Cv�2a}
fN�'��IƬg	�1 s��6�YKi=?�
�3���O��5��$*n�Z�L�]জ���_'���U*<Wj\�ђ9+)4Ϯ�چfU�3x��t�`�\p�h^�zI���l�2ϸ����9Ľ�QZ��Vzqc�(^�PF[w`� �m��"��͖�nh�HC���B�6�z>,��|�{� �"#د�9wˆ dY��`ohsȋ��nK���pm^Pqq�8X�O��cY�U���mJ	�9��&+��Pj`-v�	P$��˘+���r�篊��{�-u˔��KE@��� Ɠ���w��2e1z�Įݭ�~Х)X�(i5w�Du�f,���[�5@���ףy!%ض}QO��X6<��O�m�߆�}�	{
���g�ܝ��
�ߜ�Z	9�B�Uũ�{$��S�^�qLt}'���:�ãyO��2�4ԝ# ���jW��bщ�T�M�:�� ��:@ՙ��mWP��-vM���GHy�%�h��wAm�+����ѱ��nR��p%d7����ߏ��9i�M����Mєᄠgh���	� TXr���k;����n����_	���iC�b�]���p�����
��ȓ��|����в��7	��p� Y�>�gj���`L�U^�K�۶#�_��t��f��d��j�c�ݏ�q�mQOQ!�-Tr?r�o��6�3@�ku�U5R�b�W
�/��u5�c_��u�5��|
�� �_x,T8��B �x�%S�"�-���/Ԃ|_Qſ�2�F�e�[G��	0��L���V�p��������	$��`�J.�(&O��j46�	id謕q�o��A������& 	��t*�ة��ۄ�"��<�_E�	�r�Ovt�����@���$�MQ	�gB��ұ{E�|aG}��_RypA��A�u���*��KR������+5V�h��:���58�y|
��C���S��y����rƀͼ{*yB^�*qdx�ph����г����}i�� �j�ף�0��vS
�E��8������2�ks��&�Ѯ�����w;�/' �I�pB� �,��D Kպ5�p~T��I��2q�H��� ���Bd�=��~=&�b�4V�"��
��8w�j�KQC�
E�U���66!��E�X���,'�4�㊙�{�5 ַP�o���Y�Y���29:��p4�Z�bjNl�j���%c�N�e8��:3��k��c��"`]݆�� [�?k9�ԌHðےZ�E���u�.l�evM9������s(�7S�4�B(�}(�v�Z�!���~�0�U]�gzgz�6.�$���=��S�_���B�P0�.D�b%\�uhV@Y�bu�ʏ�3�q�4�C.=�(WH���ɒ"�oO�3FA����Mh����Ov��.5f�$M�/Tt���q��6%�� ʅ�Q��|F�ş�m5/"���f�{?"�<J4�K4TJ�&jM��a�&��Ɯ/�nb��ʧ�w}���̲�^&e���̰�gJ%��b!J7Lǅ��N���Z|S϶b/W�U[?Wm���ĥ�_x(�y��2�뽞�gl�K�;SRRk���3%�wd%���*>�C��6;vP�U˒�c����$q�^��&��i��T�I�4���y�$�ӥ5<�i:	Ǳ��hD����V?o!����BwH7N kz�`9��y�鹪Öؙ��f��������	1��qR,D��S�WH`�Y̈́�N���
oN����l+�ܾ��}�ۭ�	B|L�2����]|��`r� ]�rCf	R�����, �h7U����a,��x�fQ8����sazG'-IF��4j��dLh���)��]��ϫ0������M���,1����`~�OM{��v��ۮ��z7��<*��*�}܃}܃�Bh�N��>�?���N~}G/<T�٧����S���X�y|gc=F��X� O��$nb���-�"=q\����F&.�SV��Ӹ�s�׏i�����=M��r����E�8�z���[T_i��~����=�C��o������4֗s�9�5���C���S�JՎ&�S`��q�?�`�Cս�k9��(�+5Q�{�!�Zf�O4a�1j�Y�x�Ϟ'L?*��� ���~���߼y�_�1_�      
   a   x�3202�50�56��v1�413��2B�e&�*��e+b�	ZX�"�&�*��e�UXZ[�i343�n�����*�c���� (         �   x���1�0�����].�܍Bq�P�.B3Ė
��F��J����k�%�ʂ�\MP���p��eZ���Ґx4]�r��<�@,�ȁ9�}����ʖ���7�C�X�榍q8tq�tOPP�$A�Z�t�K�����/�~mS�A_HA>�|��[F4�<T
m�            x��\[s�Hv~��
�l2[5Z}Ｘ<���Y�e�d*Uy�Ȧ��� (Y󔿑��_��4���h;U�5��>�/��K��W��$�W�w��Z�e��U.-�ȣŃ+�菷�����E��:��뢌�<��x������d����׋b���>�˧�O��$WIlD���Ju�����Ε?�}��aF�ˎ�cV������g���_|3��h��\��z�ty]E����/���S�����]��ϗ�]�X����ٮ��$�s.&�qr�[Q���]�Xє��r<CD)��s����)�⯗�V1+q���N�ݓ(͗#���L��������s�����S)��������+�}��������^VQ�N�(ͶQ]D�4�k�?r��z�j�����b	je�Ս(	0J��
��M̄Q������nv%Y��u�ygy���t$ɻ�=��-�mz���?�)�&��#��Y6�7��W=�2Z�ة*Z�.z�a�hn�",���f���l�6Y�q+̥�t�����U/ƉU�0el�4�ϻ����~g�Ǝ�+�#�j��ϙ���� ��?��m�#�ㆵh�6�D.�����D����GxFԌIt����k,x����e�wc��VYk�B�V�^.�Y]C�>M�LX6��5�ګw��t�A�ӎ�tGH%l����tK�̭DG1!=	PL�(
�����Z���(�{����d��~��_��2%�b�Pf�u3jg�DK?� �qlۣ4�r�b���\k�t�~������,�c7t{�0m,����d��4['<��U���"�L�:AC�0�6��%9V��O�m!�.���|4~S,�C����~WE?�/��G܇��&J�T2wLR�{�h��<	Q�G�;��DؘZ�l��8��2�O0�]�n�9��t���]Z��U�| ��oZb���X��J�ҋ/g1K�"����ꣻ�)=�5$�0��s�6Bn��l����
a8$:�A�t����n�pwѧE�#d��\� �L�8kL����=d��-�QK���h-�m�>����B7Xk�h�JĬ�KQ,�?�E;��6�eu��G�C�~��|��3$- �у�����b~���>�we�4Y�# d٫����p�[���L��W���:��Edy���I��۠�H�>��R_<9wf�Vhe�_�C��@�
�'8E��GhX��J
�紘�[燴zS�+B��b�h@�N��ww2	��_�C����.�hV/���:L�Z�����s^<nܲ���][���ԃ'|O��g������Jo�h�s~�s62a�\m���tb�����@>2l0t-���E��ӱ�����lq���_�fF�w{؀�"049۞B�9�Er�A��!	�\���Kl�	b��� ӷ�p�B��/���(���t��41�����]��A{��K�.ֽA镒����|x��fb2^�g�����Uu�x�R:}"9�(
fE����i��DC���5�B�v�M!��Z;C�5�r��D1�|����S�m:ID4`{��P���oF�J�L��D�f�ew�&[<ua�����<1�X{�l2��E���*Oj�,�*��h
ExB��M�d�(~����$LB���B�&$�����n��	�K�;D.�F+*�f�\���@Q�$=Hޗ%y�'��m`N���a��>*}�� &	%�8�����G�8	hn�OX����hYbA@|���:�c� �əƵ���Ͻ�]I���b�5�6$����Z��Ʒ���$����%��'��E~EO�.�hٗ0�6Qq(��Y,��_GTt�:`ʝ{*`I�h���q��'��+��V�$䙸e����	��j��.��ʪQ��N�)�� ^���1�j���x.)!ņX4�� R�9�q�X�<�h'�I	Ѵ�UF�e-2�1�9?C?�m�q�%
��S٥�V�� ���,���K��>gS4�E�,6�
�6OM2���uT�3��&VfN��t!��ž�쮧����?�͔^l�bM�s��U?��W���r�aG�i5�ߜ���_�&7{	����<�C���(�ic�<���b��2��:�6��Mf��ݑ�����9%() p��9��I�y�[7L2���Z~ș��{/ U����j,Őa��������ؓ@,�����#z��/z���B�oA1�}�Z����Fs���F#�w���ۙa�tVv��]雗/�}���6���A�|��"Ӿ��� ��@��Eb�3�L�ߛ8B�v�閲��g�pf�A :�o��+��ع ����o1�ڕY��Ő{�x�숽y�**�(�F��81�!"h����n"w}�շ��%�v\\�q��%eP�j��X+@�FSV���6zߥ�N�S:9���ON4�%�e:�S�!�޹�\��
D[�����r�Q���ā*�@�3�K�	b �4�_3*#���2}�٥_�q1�����R�ۆ`%��0���M��R��P��(U��}.4���N�*�1aT�}HW&��������*#��!u���Ru�ࠓ nN�6����6K���Q��yv���v���j˃"hS-�W�cG'NC�X�x:1Z�PMTM�bm��3#�����<G�� '2Q
�Bg�m���.�w�!8��KN���M-�>�=���o!�p%�ls��	�p>��m�C����c��'�0�f�@X�CF�R�& �K�I�r$|[4qǊ�w��
(U'�� u �z����juݪeW�;�ćl|g,�5h��v9�`�'u�)Æg�֠�e����)A�4�����YT�K��]g�}��'l`S���b��`��}�.�"n�� �jf9N�7��u��*�d�� �^��	A>K��#hS����2�c! �nZ0����6+�QgM}�������Þ.����]vT\0;������}�0�`��ɋ�~�k*T��c��~��Y��БJ���,w��^7T>:���ہ޹a>p[�@�/r��(�/�����eУ@*L
aķ�@�l�3�����dR�����2[P�`��7[*�f�m6���s ��IY�C�D�Jx��<z���Т-0y�+��F��c	�����.���A��Ɍ��wž��:�u�=�L�b�Ҽ�[�4�\$ǲd��=��Ϳ��~�u �?�'9�����a�,C�Y�M�7�IX� $���X�P+C֥1�%�ަ�m��ky�=����J����j��Ҟ��K��׭���hd�����b�,Ӂ<�������@0�3&�	'�@�Ā��>jL�[�ҦA��ٷ٧������i2�,��ś��sZ�;5PS��\֔L�U߾����ŏV�h ��ʉ6f��_3�#�5�o��X
�B�N$��q�QT.<鏠�`���!ͻc �8�L8nd���]c0זb�t�1�$T�{קb۸��ek��n<gF�P_����~
mw�����o����MF?6��~b�Lt g�-3�?�P:V?�-2���U��/ l�����i���,�(�%U*�%fE8s��O�CPn�I3� �~����y�,�a��h7�̼ȯ)?\f[�muA�֕�g�ጚ3����-�}�&x�pmT|���W�yj��,Z���"^���&�C;ؗ4���u����m.�p��y �X/m�a��1	C ���������w�+7�ϪoQ���fSL����I��pn#��"�⦤�����g�i���f@���Wykl��j.�^��q5n�8 �c�)��>q�m��Z��1!R�cI��HK�>�X�;����Kd�nH� A�]�i�T�m���6����%f�7�rN-��D���N�3�����MvW�0!Y���T7�Ԉ�d�}L��zT��z��[_������q�R��\���V?7�P�IX��o���*@0�"���m
%>ˆ��ݾnm��>��D^�$1&p�A0A��n�EV��V���p׮ˁ��Zj��a~�l�N�K��W��!�rv*�mlRD]�w�;�aԥ�= 3	  �"�IÏAS>�[��lZ즉}W���}�[I-��_����`0�&��3�hx�!�6)���Ҏ�<T ��~�{_q���3���,P��.����#�o#�(%�Շ��������O�Cǡ`�k�5Tm�����nK��|	@HA" f9����[*1������d��c��<�4l���7пM7z�t�G�%9_(�؛�`+�4o��('
H�Ip��O�r�m�/�_�(�#��b�{�f�����4'.X0�p���])o��8���1�]����O��sKx�2K���Y�"iow���p�hkC�M��o���^�l�@;�q�ɹy3�PO�׹{l*��L�E ���\�8�%�	�����	r3N�p�����h�$�?�S.5�38�����˯�ϠI_C�UoB���"4�$.}*6�����Sӓձ���yB�'C�0/��q+mq��H�r�m6����ҟ���ͮ���������a�g��|m��͑�D׭1�=:sX����瓅0��~����v7������0'`�xZ\D�E�gS�j�Q� ���Ҷm�m� wp��[t���'�.�Əv�REe�ޥ�d�Ux/�ܚ@������s�	���q9Km�c眈���
�)n���\K��sWs�+���-��-�V��M=?Z�`���7�_<-6���rh������sn�1@�����ػ�&V/���M�׷A$�]2i�0J�NCʣY��A������:�OM�mC��W�9k�Ds���e����7b���R�u�St4��/#�s�0K�-΍겧h�W��s�J�����8��_�n�_��-vg��	����Y"�����] ��tev�w/0\������b�Qi�XS��WR�{W�S������m;���⧨Z��]A����ٴ�>J�����P�`
�$zХuy�������],r�J_�X`��!��[�+���p�bDp��n�x�2�>�&�~��m�S���͕2���`C����Z�B}Y��=�~�91�"�Az��9�9�*�&7�O}���1Oќ�d|4�|���?��IBo��G*=�ц��a/���$B�����hzݠo��ݾ.���U��@9JJ����ܦ6�բa��ټ8��<G{�ܑ��&�W��R\�!}���Q��Q�f_�ºWp��}qx���pg-zv�q4�*�<v��i�e��>�0c		NB�j���<�t�,]sG�,"��l���,-��MO�S�z1�ٷ��Ѧ�7Z\�L�� ��X�49b�?u6;<�Puҗ<�x��?����Z�z!
6�`���7�ڝ��a����d���4R�^�'y�=&[!'S����&�ނ�� ��өR�7P��{a�>�b��]�u��N��BB��w��pSC�jP!=���(���r����Zpb��M�B�3D)e�؜4�Q�wU���l�8M���vYH�/5G�n�9݅��Ξ� g��A�6ML��G��S6H-��x�ȑ/	�С�68ǛU���@6��ʳD{�8��W���4�2�M[V�z�6�BzNM�������/�{��>�2}B#!���>��Jx�ъ�Q"h�:R�ou� V��4�?��	)}^�����;����_�kn��8�.�0;묛D����6��c��{8t~��T,C�b�u����*��@�p�8֖]���)jL��R��$�͐qIW+x�!ߠ|A�& с�����"�5F\}����*o�"��5S��Ɠ7�|�/��VO��T`+fM��N?�u�Y�m3�ߧ�J��SI=�����F��;�P֞NX��t�p,�^���	��,��&P��-��Q@>�:�tv�?��L��E�CJkFRߞ7
���u�z�I�E|'��Md|���\��^ٮ�zxK�Ϋ�н��D}��>nq�� ���T��*-���׫b��ӹ=)cau�gO���Ƴ���j������~{���ڻa���] �%���nR��p���o�l�44��.�5��^��!�xWf�=E�������3t�G=Z���'��B�s��V
�t�"�jb�+K�B�{���x{6�eQUו[ G㷠��L��]�:	T6�|���pNi��t�M�.�5|z9?�).��g���S��.P�+2�ޏ������LȐ�;z2�z=Cu�	N:���F�7��nR��*��ϡ�"��{�Hh���VÛ�ÆSmd%_����zv��i�Y��8�n!��k��f�JC�ؖ@��ۏ;��Vp������zrX{0ڰ�r֏>�\xz���c�t���93�g�4�������Z�!�.-td�P;:�?���?���Y�         �  x�]X;�$9��fC��?κc���?ǦP��P�1�B@B����n����H���׿�C��~��us��L)�N`s� �l��$|B3�E� R�e�ʔ�ɜ~ [� f�S���0���0�l~&�������u-�S:�b�4%����s!i#�!"�V��hǜe%�v8�dŮ>ct�!�+�:����e��.#�o�Vó�j&b_%�1��7]�BGz*�&�_���n�ޕ[�U���9��rȄ_a�^U��Hf߹�y���X���N4ߔ�4�~/g$a5a��j���Q��:IAHفxA>Vv���@�!E�,�3�Che�pE�4:��¶
5jP��X�RӪ��!��e%���Y�,A^�(IT6����Ij� Nݡ�8�l؇�/��Te�z��ت\h���T���!h���7Uɯա8��ؿV��j��Ņ�+�Fq4a��=���4�P��Dt(n�j_�>G���Vř�z��pܔ�:��x�&����p����h���p�#��~8��h^��p\h؝���W�����CqA����<w�Cq�ݯ �3��c#�vr�$Ѳ"��vBҧ�C�*�ʡ�h��d6�륒�o�A�v�T�R�:�*�̬!�~�Y��Z��Ub��!��5���s�к/܍M�� ��JS�#�n�J��:8� 0��1hv�ëόk��H���H��
S�`C\�	3{�"x��UE����2s���P1+���7�����/ܾ�4ڨ���	ଅ �cr歀fG�.R��ws i�2�CV��B�U7��:�4&)zl(��n�k5�2[�����v���8���W�)bN���h�M^V%������
6N5�BCdp��TO�ϲ�:r�����R������� �Q1�6�;S�+�򇸊�$�ӴԦ�\׸�$��jM�+<܄k�İ��aWF��@}��0�����L�[g�&�7I�z�"w�nD���W� 5w����pT)�PZW�h�J�`��
5WP���:ɧ_b�8�bz#�Y�@�kZB�k���U}�m��`7lUl[#�k@P��U�o���z�� ��7JFo$Q�ϫ�y�n����ũ��AS6PQ��ԋ�3�����B*�!wA^��'��TEH���s0���_��hQ�f�\HG��jHL��&��Ș�+m�YF��W�u�6om�iU�{A� ��{�"��D���BR2�QN5|�3���q5fo-����� :�;�p���TDv+,<-Y�u��@�tNl��O�5��J�r�<{�:�2����5� m�G�KM��q��>�����ka��6�v���e4�;<�A�u)��~)�5�֙мx��C�t{'p�N��z�ޯ֤��5���[Y�
ˎ�I8d	͸wh�j'r��݆���III�Q�hC{�F�o�� ��Qj�Y4���[u�z�|!�l,��³�A��j�u�>xA�ֳ�4F�Y?j����i�1�#}R�(/%�Zm�+t����T���,��a��-D��i����ˬ)�7n�Q"ʥl^УD��J�BG�@��s��DP~�Q%���a�
�Q"8�;t��~�� ��t���l�q��" ���!
��/�(�=��D0�G���
�~�G����������         �  x�}U�n7}������ɣc���p���P��]6\rË��{�\�$.@@9<g.gf_�K��y���^�\#Ǻ��Ie�4)�և!J��~�S�/��Kq)�����:
�m_��to`�����t�
f�r¡��p��d�1)��ƒT]0:۔'�+q%����M}y�J���!�:�GXʾ\�5[�gػٖ*��T:���Z\�߳�����Z��d����~d���?�txp�jMKփӒ
���8���C���q#��
r5���)�]=�[�a��j(;?Pe�L�5�[q+���Jl��⳸�V�6f�=- ��$}+w3L�a�"�w��ISK����Q��3���L^��x!YSwg2 ����T@�?���4�����b�����h�~�z�|..jojyJG��]y��mf�Ԋ�!���KV����؁S�>�O��5@��|r�oK��Փk��0��9� �`4sv�����R䟣[�hff/�-X�X�Įt5�|V�Τ�T,5����4S�,1C���ď���R|?��ů�;I}��3ą鐒-��Р �E��&��|)��Q���0c��q��y*�Q���o���Z�*!in��J`=X3@����������#�Y�a���'[�+�:�8�a��z-��b:���ڢ�#����e�$SO�k�SD�H�4*�X�*���&�i�Ƈ�#��2������;$�N%��zw&���-Yj�0q�qq�p��,q7��!ėLk�I+���e�#[۪�9*�Xm�o�4��S6o�3)��/oʼK�5��p�2c�y �l�����*zmh�爐4��4����J|�� vSښږ���oc�y�y͉��O�e�)�;���B����,��W6
�J��W
W��vL%��9QE�Y�A)�#�����A��H         �  x�}л��@��bSG��젢[*��:� Q.
�~),��M������Y!E��
��Fr'L ¿���jR�S
���a&�?���n�zX52�H�֐{�қ`�A��U������Uk��d�d�@$����<N�1���
�'��9�N=Z	vjO{@W��]�D)�߹�A�^���G����Y�t���2'�7��������,�7��QL��^e�>p*���\��x�u������rkB��!'�q���z~}m��~=ݑ��>����l|�t�#vy-�i���u��Md�B�$|��0�Zq�H�/Ӳ�ޤ�8�s^�$q��L�\N�$mH9����%���z�	��?�'��~G�\��e���8�Z��ŋ}_��=F`��e ;��            x������ � �            x������ � �     
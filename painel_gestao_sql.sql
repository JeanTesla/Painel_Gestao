-- SCHEMA: public

-- DROP SCHEMA public ;

CREATE SCHEMA public
    AUTHORIZATION postgres;

COMMENT ON SCHEMA public
    IS 'standard public schema';

GRANT ALL ON SCHEMA public TO PUBLIC;

GRANT ALL ON SCHEMA public TO postgres;

-- Table: public.contratos

-- DROP TABLE public.contratos;

CREATE TABLE public.contratos
(
    id SERIAL ,
    prestador_id integer,
    servicoprestado character varying(100) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    datainicio date,
    datafim date,
    datacadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    datacancelamento timestamp without time zone,
    isdeleted smallint DEFAULT '0'::smallint,
    CONSTRAINT contratos_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.contratos
    OWNER to postgres;


-- Table: public.prestadores

-- DROP TABLE public.prestadores;

CREATE TABLE public.prestadores
(
    uf character(2) COLLATE pg_catalog."default",
    tipo character(1) COLLATE pg_catalog."default",
    id SERIAL,
    numero character varying COLLATE pg_catalog."default",
    bairro character varying COLLATE pg_catalog."default",
    cep character varying COLLATE pg_catalog."default",
    cidade character varying COLLATE pg_catalog."default",
    complemento character varying COLLATE pg_catalog."default",
    cpfcnpj character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    logradouro character varying COLLATE pg_catalog."default",
    nomerzsocial character varying COLLATE pg_catalog."default",
    isdeleted integer DEFAULT 0,
    "dataHoraCancelamento" timestamp without time zone,
	CONSTRAINT prestadores_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.prestadores
    OWNER to postgres;
export const modelo2 = {
    "scores": {
        "_id": "6805614656b164ea6f14756a",
        "return": {
            "dataConsulta": "20/04/2025 18:04:02",
            "pessoaFisica": {
                "score": 494,
                "faixaScore": "Alto índice de inadimplência",
                "capacidadePagamento": "O consumidor apresenta ou apresentou alguns atrasos de pagamentos ou pendências financeiras na média dos últimos 12 meses.",
                "perfil": "O consumidor pode apresentar algumas divergências sobre o comportamento esperado na utilização de produtos financeiros."
            },
            "pessoaJuridica": null,
            "observacao": null
        },

    },
    "scores_ind": null,
    "sintegras": [],
    "financialRisk": {
        "_id": "680560ad56b164ea6f147539",
        "return": {
            "FinancialRisk": {
                "TotalAssets": "100K A 250K",
                "EstimatedIncomeRange": "3 A 5 SM",
                "IsCurrentlyEmployed": true,
                "IsCurrentlyOwner": true,
                "LastOccupationStartDate": "2023-10-31T00:00:00Z",
                "IsCurrentlyOnCollection": false,
                "Last365DaysCollectionOccurrences": 0,
                "CurrentConsecutiveCollectionMonths": 0,
                "IsCurrentlyReceivingAssistance": false,
                "FinancialRiskScore": 800,
                "FinancialRiskLevel": "B"
            },
            "status": {
                "financial_risk": [
                    {
                        "Code": 0,
                        "Message": "OK"
                    }
                ]
            }
        },

    },
    "lawsuits": null,
    "lawsuits_distribution": {
        "_id": "680560ad56b164ea6f147534",
        "return": {
            "LawsuitsDistributionData": {
                "TotalLawsuits": 0
            },
            "status": {
                "lawsuits_distribution_data": [
                    {
                        "Code": 0,
                        "Message": "OK"
                    }
                ]
            }
        },

    },
    "ibama": null,
    "creditRisk": null,
    "negativeCreditDetail": {
        "_id": "6805642156b164ea6f147594",
        "return": {
            "dataConsulta": "20/04/2025 18:16:13",
            "pessoaFisica": {
                "pendenciaFinanceira": {
                    "status": "Consta Pendência",
                    "totalPendencia": 401.58,
                    "protestos": [],
                    "acoesJudiciais": [],
                    "recuperacoesJudiciaisFalencia": [
                        {
                            "documento": null,
                            "nomeEmpresa": "FINANCEIRA ITAU CBD S.A.- CREDITO, FINANCIAMENTO E INVESTIMENTO",
                            "motivo": "FINANCIAMENTOS",
                            "valor": 401.58,
                            "numeroContrato": "005245677720000",
                            "tipoParticipacao": "PRINCIPAL",
                            "status": "ATIVO",
                            "dataOcorrencia": "06/04/2024 00:00:00",
                            "dataInclusao": "10/10/2024 00:00:00",
                            "dataModificacao": null,
                            "endereco": {
                                "logradouro": null,
                                "numero": null,
                                "complemento": null,
                                "bairro": null,
                                "cidade": "UBERABA",
                                "uf": "MG",
                                "cep": null
                            }
                        }
                    ],
                    "chequesSemFundo": []
                }
            },
            "pessoaJuridica": null,
            "observacao": null
        },
    },
    "basicData": {
        "_id": "680560ad0a792c4fc7508235",
        "fiscal_number": "U2FsdGVkX19kfX8ggxSVP9yLRLs1p3dHu5pahnLsGMQ=",
        "first_fiscal_number": "063310",
        "created_at": "2025-04-20T21:01:33.272Z",
        "created_by": "667d6cb0bfec68a7bf3ccfa8",
        "updated_at": "2025-04-20T21:01:33.793Z",
        "updated_by": "667d6cb0bfec68a7bf3ccfa8",

        "__v": 0,
        "basic_data": {
            "MatchKeys": "doc{06331057676}",
            "BasicData": {
                "TaxIdNumber": "06331057676",
                "TaxIdCountry": "BRAZIL",
                "AlternativeIdNumbers": {
                    "SocialSecurityNumber": "13155439989"
                },
                "Name": "EDELWEISS TEIXEIRA FERNANDEZ",
                "Aliases": {
                    "CommonName": "EDELWEISS FERNANDEZ",
                    "StandardizedName": "EDELVEIS TEIXEIRA FERNANDE"
                },
                "Gender": "F",
                "NameWordCount": 3,
                "NumberOfFullNameNamesakes": 1,
                "NameUniquenessScore": 1,
                "FirstNameUniquenessScore": 0.00389105,
                "FirstAndLastNameUniquenessScore": 1,
                "BirthDate": "1984-05-21T00:00:00Z",
                "CapturedBirthDateFromRFSource": "1984-05-21",
                "IsValidBirthDateInRFSource": true,
                "Age": 40,
                "ZodiacSign": "GEMEOS",
                "ChineseSign": "Rat",
                "BirthCountry": "BRASILEIRA",
                "MotherName": "LELIA INES DE RESENDE TEIXEIRA",
                "FatherName": "",
                "MaritalStatusData": {},
                "TaxIdStatus": "REGULAR",
                "TaxIdOrigin": "RECEITA FEDERAL",
                "TaxIdFiscalRegion": "MG",
                "HasObitIndication": false,
                "TaxIdStatusDate": "2025-03-10T00:00:00",
                "TaxIdStatusRegistrationDate": "2001-07-25T00:00:00Z",
                "CreationDate": "2016-08-23T00:00:00Z",
                "LastUpdateDate": "2025-03-10T00:00:00"
            },
            "status": {
                "basic_data": [
                    {
                        "Code": 0,
                        "Message": "OK"
                    }
                ]
            }
        },
        "name": "EDELWEISS TEIXEIRA FERNANDEZ",
        "uf": "MG"
    },
    "kyc": null,
    "chat_lawsuits": null,
    "chat_risk": {
        "_id": "6805616e0a792c4fc75083c2",
        "return": "{\n    \"ind_score\": 561,\n    \"boa_vista_score\": 0,\n    \"boa_vista_ocorrencias\": 0,\n    \"restritivo_score\": 0,\n    \"restritivo_ocorrencias\": 0,\n    \"quod_ocorrencias\": 401.58,\n    \"quod_score\": 494,\n    \"pgfn_extended_debitos_pgfn\": false,\n    \"pgfn_extended_debitos_rfb\": false,\n    \"pgfn_return_total_divida\": 0,\n    \"protests\": false,\n    \"protests_total\": 0,\n    \"mte_conseguiu_emitir_certidao_negativa\": true,\n    \"financialRisk_EstimatedIncomeRange\": 6000,\n    \"financialRisk_TotalAssets\": 175000,\n    \"oldies_protests\": false,\n    \"oldies_protests_value\": 0,\n    \"last_year_protests\": false,\n    \"last_year_protests_value\": 0,\n    \"cities_with_protests\": 0,\n    \"irpf\": \"Saldo inexistente de imposto a pagar ou a restituir\",\n    \"media_score\": 561,\n    \"patrimonio_total\": 0,\n    \"dividas\": 0,\n    \"limite_credito\": 0,\n    \"basicData\": true,\n    \"mensagem\": \"Cliente sem protestos recentes ou dívidas significativas registradas. Contudo, considerando os scores baixos recebidos e o alto número de ocorrências na Quod, existe um risco elevado. Não foram identificadas pendências severas em impostos (IRPF) ou protestos, mas a presença de ocorrências e o score médio abaixo de 500 indicam cautela na análise. Recomenda-se classificar como alto risco.\"\n}",


        "updated_at": "2025-04-21T14:07:51.962Z",
        "updated_by": "667d6cb0bfec68a7bf3ccfa8",
        "created_at": "2025-04-20T21:04:46.973Z",
        "created_by": "667d6cb0bfec68a7bf3ccfa8",
        "__v": 0
    },
    "addresses": null,
    "phones": null,
    "boaVista": null,
    "pgfn": {
        "_id": "680560cd56b164ea6f147558",
        "return": "Dados não encontrados",


        "updated_at": "2025-04-20T21:04:54.576Z",
        "updated_by": "667d6cb0bfec68a7bf3ccfa8",
        "created_at": "2025-04-20T21:02:05.527Z",
        "created_by": "667d6cb0bfec68a7bf3ccfa8",
        "__v": 0,
        "extended": "error"
    },
    "cenprot": {
        "_id": "680560c156b164ea6f147543",
        "return": "Não foram encontrados protestos para este documento.",


        "updated_at": "2025-04-20T21:01:53.218Z",
        "updated_by": "667d6cb0bfec68a7bf3ccfa8",
        "created_at": "2025-04-20T21:01:53.218Z",
        "created_by": "667d6cb0bfec68a7bf3ccfa8",
        "__v": 0
    },
    "mte": {
        "_id": "680560cb56b164ea6f14754d",
        "return": [
            {
                "codigo_autenticidade": "V7QHKY7YEQ",
                "conseguiu_emitir_certidao_negativa": true,
                "emissao_datahora": "20/04/2025, às 18:01:59, conforme horário oficial de Brasília",
                "empregador": null,
                "mensagem": "NEGATIVA",
                "normalizado_cnpj": "00006331057676",
                "normalizado_cpf": "",
                "normalizado_emissao_datahora": "20/04/2025 18:01:59",
                "site_receipt": "https://us-central1-infosimples-data.cloudfunctions.net/infosimples-storage/vDZVH8XExdWrBmjcifiZ0aWCSS6kBAYRqJDTLozx1pA=/1745787723/SzDpJJ/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2luZm9zaW1wbGVzLWFwaS10bXAvYXBpL210ZS9jZXJ0aWRhby1kZWJpdG9zLzIwMjUwNDIwMTgwMjAzLzAyaDJoVXFCVjZULUtoeV81bEFnc2h5enVETkw0Z2pNLzAyZDA0MDFiOGEyNjI3NGIwMzhmOWJkZGI0NDUyYmMwXzBfeGRj.pdf"
            }
        ],


        "updated_at": "2025-04-20T21:02:03.332Z",
        "updated_by": "667d6cb0bfec68a7bf3ccfa8",
        "created_at": "2025-04-20T21:02:03.332Z",
        "created_by": "667d6cb0bfec68a7bf3ccfa8",
        "__v": 0
    },
    "incra_rr": null,
    "car_rr": null,
    "scr_agreement": null,
    "restritivo": null,
    "irpf": {
        "_id": "680560cc56b164ea6f147553",
        "return": [
            {
                "agencia": null,
                "ano_exercicio": 2024,
                "banco": null,
                "chave_pix": null,
                "consulta_datahora": "20/04/2025 18:04",
                "disponivel_data": null,
                "lote": null,
                "nome": "EDELWEISS TEIXEIRA FERNANDEZ",
                "normalizado_consulta_datahora": "20/04/2025 18:04:00",
                "origem": "web",
                "resultado_encontrado": "Saldo inexistente de imposto a pagar ou a restituir",
                "situacao_debito_automatico": null,
                "situacao_restituicao": null,
                "status": "Sua declaração já foi processada.Resultado encontrado: Saldo inexistente de imposto a pagar ou a restituir.",
                "tipo_declaracao": null
            }
        ],

    },
    "cgu": {
        "_id": "680560c656b164ea6f147548",
        "return": [
            {
                "bases_dados_consultas": [
                    {
                        "nome": "CEIS",
                        "situacao": "Nada Consta",
                        "url_detalhes": "https://portaltransparencia.gov.br/sancoes/consulta?cpfCnpj=06331057676"
                    },
                    {
                        "nome": "CEPIM",
                        "situacao": "Nada Consta",
                        "url_detalhes": "https://portaldatransparencia.cgu.gov.br/sancoes/cepim?cnpj=06331057676"
                    },
                    {
                        "nome": "CNEP",
                        "situacao": "Nada Consta",
                        "url_detalhes": "https://portaldatransparencia.cgu.gov.br/sancoes/consulta?cpfCnpj=06331057676"
                    },
                    {
                        "nome": "CGU-PJ",
                        "situacao": "Nada Consta",
                        "url_detalhes": null
                    },
                    {
                        "nome": "ePAD",
                        "situacao": "Nada Consta",
                        "url_detalhes": null
                    }
                ],
                "codigo_controle": "MVuHPNIxNkDL6IlrSrAj",
                "conseguiu_emitir_certidao_negativa": true,
                "consultado": "EDELWEISS TEIXEIRA FERNANDEZ",
                "cpf_cnpj": "06331057676",
                "data_validade": "20/05/2025",
                "datahora_emissao": "20/04/2025 18:01:55",
                "mensagem": "Certifica-se que, em consulta aos sistemas ePAD e CGU-PJ e aos cadastros CEIS, CNEP e CEPIM, mantidos pela Corregedoria-Geral da União, NÃO CONSTAM registros de penalidades vigentes ou de procedimentos acusatórios em andamento, relativos ao CPF/CNPJ consultado.",
                "site_receipt": "https://us-central1-infosimples-data.cloudfunctions.net/infosimples-storage/VhBVn9OXGv8B3bVAFIZ4gDHXYmbvXmtSk_h8kEjNUUk=/1745787718/8Q2pSf/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2luZm9zaW1wbGVzLWFwaS10bXAvYXBpL2NndS9jbmMtdGlwbzEvMjAyNTA0MjAxODAxNTgvRmw4VDFyOUtYSF95aUtSVHpFX0NfeXhxVmQzX0xfMEQvNWU2NTk2OWViYmI3YTQxYTlhNjYwYzI3ZTVhOGExMTdfMF9SVUE=.pdf"
            }
        ],
    },
    "data_risk": {
        "_id": "68064bda2712e24db521ea76",
        "return": {
            "OnlineQueries": [
                {
                    "Origin": "Datarisk",
                    "InputParameters": "doc{06331057676}",
                    "QueryRawHTMLResult": "{\"MatchKeys\":\"06331057676\",\"DataReference\":\"2025-04-21\",\"Score\":628.0,\"Rating\":\"B\",\"Result\":\"Success\"}",
                    "QueryResultData": {
                        "TaxIdNumber": "06331057676",
                        "Score": "628",
                        "Rating": "B"
                    },
                    "QueryDate": "2025-04-21T13:44:53.4112613Z"
                }
            ],
            "status": {
                "partner_datarisk_score_person": [
                    {
                        "Code": 0,
                        "Message": "OK"
                    }
                ]
            }
        },


        "updated_at": "2025-04-21T13:44:58.598Z",
        "updated_by": "667d6cb0bfec68a7bf3ccfa8",
        "created_at": "2025-04-21T13:44:58.598Z",
        "created_by": "667d6cb0bfec68a7bf3ccfa8",
        "__v": 0
    }
}
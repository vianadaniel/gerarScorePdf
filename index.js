import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import fs from 'fs';
import { modelo1 } from './modelo.js';
import { modelo2 } from './modelo2.js';
import { modelo3 } from './modelo3.js';
import sharp from 'sharp';

// Correct way to assign vfs when using ES modules
pdfMake.vfs = pdfFonts;

// Create a higher quality canvas
const width = 600;
const height = 400;
const chartCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour: 'white',
    devicePixelRatio: 2.0
});

async function gerarGraficoBase64(score) {
    // Create a simpler chart configuration
    const config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [score, 1000 - score],
                backgroundColor: [
                    score < 300 ? '#f87171' :
                        score < 600 ? '#FF8001' :
                            '#4F6352',
                    '#F5F5F5'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: false,
            cutout: '75%',
            circumference: 180,
            rotation: 270,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            layout: {
                padding: {
                    top: 20,
                    bottom: 70
                }
            }
        },
        plugins: [{
            id: 'customPlugin',
            afterDraw: function (chart) {
                const ctx = chart.ctx;
                const width = chart.width;
                const height = chart.height;

                // Draw score text
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 32px Arial';
                ctx.fillStyle = '#333333';
                ctx.fillText(score.toString(), width / 2, height - 140);

                ctx.font = '18px Arial';
                ctx.fillStyle = '#666666';
                ctx.fillText('de 1000', width / 2, height - 110);

                // Add risk label
                ctx.font = 'bold 20px Arial';
                ctx.fillStyle = score < 300 ? '#f87171' : score < 600 ? '#FF8001' : '#4F6352';
                ctx.fillText(score < 300 ? 'RISCO ALTO' : score < 600 ? 'RISCO MÉDIO' : 'RISCO BAIXO', width / 2, height - 70);
                ctx.restore();
            }
        }]
    };

    // Render the chart to a buffer
    try {
        const image = await chartCanvas.renderToBuffer(config);
        return image.toString('base64');
    } catch (error) {
        console.error('Error rendering chart:', error);
        throw error;
    }
}

const data = modelo3
const chatRiskData = JSON.parse(data.chat_risk?.return || '{}');
async function gerarPdfScorePdfmake(score, data) {
    try {
        const base64Img = await gerarGraficoBase64(score);
        const imageDataUrl = `data:image/png;base64,${base64Img}`;

        // Convert webp to png and read logo file
        const pngBuffer = await sharp('./descobreai.webp').toFormat('png').toBuffer();
        const logoBase64 = pngBuffer.toString('base64');
        const logoDataUrl = `data:image/png;base64,${logoBase64}`;

        // Extract important data from the modelo1 object
        const basicData = data.basicData?.basic_data?.BasicData || {};
        const scoreData = data.scores?.return?.pessoaFisica || {};
        const boaVistaScore = data.boaVista?.return?.essencial?.score_classificacao_varios_modelos?.[0]?.score || 'N/A';
        const financialRisk = data.financialRisk?.return?.FinancialRisk || {};
        const lawsuits = data.lawsuits?.return?.Processes || {};
        const pgfnStatus = data.pgfn?.extended?.[0] || {};
        const irpfStatus = data.irpf?.return?.[0]?.resultado_encontrado || 'N/A';
        const protestStatus = data.cenprot?.return || 'N/A';
        const mteStatus = data.mte?.return?.[0]?.conseguiu_emitir_certidao_negativa || false;
        const chatRiskData = JSON.parse(data.chat_risk?.return || '{}');

        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [30, 30, 30, 30],
            background: function () {
                return {
                    canvas: [
                        {
                            type: 'rect',
                            x: 0, y: 0, w: 595, h: 842,
                            color: '#FFFFFF'
                        }
                    ]
                };
            },
            content: [
                {
                    columns: [
                        {
                            width: '40%',
                            stack: [
                                { image: logoDataUrl, width: 70, alignment: 'center', margin: [0, 0, 0, 5] },
                                { text: 'ANÁLISE DE CRÉDITO', style: 'header', alignment: 'center', color: '#384A39' },
                                { image: imageDataUrl, width: 200, alignment: "center", margin: [0, 10, 0, 5] },
                                { text: `Score: ${score}/1000`, style: 'scoreText', alignment: 'center' },
                                {
                                    text: score < 300 ? 'RISCO ALTO' : score < 600 ? 'RISCO MÉDIO' : 'RISCO BAIXO',
                                    style: 'riskLabel',
                                    color: score < 300 ? '#f87171' : score < 600 ? '#FF8001' : '#4F6352',
                                    alignment: 'center',
                                    margin: [0, 0, 0, 10]
                                },

                                // Personal Information Section
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*'],
                                        body: [
                                            [{ text: 'INFORMAÇÕES PESSOAIS', style: 'tableHeader', fillColor: '#384A39', color: 'white' }],
                                            [{
                                                stack: [
                                                    { text: `Nome: ${basicData.Name || 'N/A'}`, style: 'smallText', margin: [0, 3, 0, 0] },
                                                    { text: `CPF: ${data.basicData?.extended?.cpf || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 0] },
                                                    { text: `Nascimento: ${data.basicData?.extended?.dataNascimento || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 0] },
                                                    { text: `Mãe: ${basicData.MotherName || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 0] },
                                                    { text: `Gênero: ${data.basicData?.extended?.sexo || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 3] }
                                                ]
                                            }]
                                        ]
                                    },
                                    margin: [0, 5, 0, 0]
                                },

                                // Contact Information (condensed)
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*'],
                                        body: [
                                            [{ text: 'CONTATO', style: 'tableHeader', fillColor: '#384A39', color: 'white' }],
                                            [{
                                                ul: (data.basicData?.extended?.telefones || []).slice(0, 2).map(tel =>
                                                    `${tel.telefoneComDDD}${tel.whatsApp ? ' (WhatsApp)' : ''}`
                                                ),
                                                margin: [0, 3, 0, 3]
                                            }]
                                        ]
                                    },
                                    margin: [0, 5, 0, 0]
                                }
                            ]
                        },
                        {
                            width: '58%',
                            margin: [10, 0, 0, 0],
                            stack: [
                                // Score Summary and Credit Analysis
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*'],
                                        body: [
                                            [{ text: 'RESUMO DA ANÁLISE', style: 'tableHeader', fillColor: '#384A39', color: 'white' }],
                                            [{ text: chatRiskData.mensagem || 'Análise não disponível', style: 'normalText', margin: [0, 3, 0, 3] }]
                                        ]
                                    },
                                    margin: [0, 28, 0, 0]
                                },

                                // Credit Details Row
                                {
                                    columns: [
                                        {
                                            width: '48%',
                                            margin: [0, 5, 5, 0],
                                            table: {
                                                headerRows: 1,
                                                widths: ['*'],
                                                body: [
                                                    [{ text: 'CRÉDITO', style: 'tableHeader', fillColor: '#384A39', color: 'white' }],
                                                    [{
                                                        stack: [
                                                            { text: `Boa Vista: ${boaVistaScore}`, style: 'smallText', margin: [0, 3, 0, 0] },
                                                            { text: `Capacidade: ${scoreData.capacidadePagamento || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 0] },
                                                            { text: `Perfil: ${scoreData.perfil || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 3] }
                                                        ]
                                                    }]
                                                ]
                                            }
                                        },
                                        {
                                            width: '48%',
                                            margin: [5, 5, 0, 0],
                                            table: {
                                                headerRows: 1,
                                                widths: ['*'],
                                                body: [
                                                    [{ text: 'RISCO FINANCEIRO', style: 'tableHeader', fillColor: '#384A39', color: 'white' }],
                                                    [{
                                                        stack: [
                                                            { text: `Nível: ${financialRisk.FinancialRiskLevel || 'N/A'}`, style: 'smallText', margin: [0, 3, 0, 0] },
                                                            { text: `Pontuação: ${financialRisk.FinancialRiskScore || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 0] },
                                                            { text: `Renda: ${financialRisk.EstimatedIncomeRange || 'N/A'}`, style: 'smallText', margin: [0, 0, 0, 3] }
                                                        ]
                                                    }]
                                                ]
                                            }
                                        }
                                    ]
                                },

                                // Legal Status Section
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*'],
                                        body: [
                                            [{ text: 'SITUAÇÃO LEGAL', style: 'tableHeader', fillColor: '#384A39', color: 'white' }],
                                            [{
                                                columns: [
                                                    [
                                                        { text: `Processos: ${lawsuits.TotalLawsuits || 0}`, style: 'smallText', margin: [0, 3, 0, 0] },
                                                        { text: `Protestos: ${protestStatus === 'Não constam protestos nos cartórios participantes do Brasil' ? 'Não constam' : 'Constam'}`, style: 'smallText', margin: [0, 0, 0, 0] },
                                                        { text: `PGFN: ${pgfnStatus.conseguiu_emitir_certidao_negativa ? 'Regular' : 'Irregular'}`, style: 'smallText', margin: [0, 0, 0, 0] }
                                                    ],
                                                    [
                                                        { text: `Débitos PGFN: ${pgfnStatus.debitos_pgfn ? 'Sim' : 'Não'}`, style: 'smallText', margin: [0, 3, 0, 0] },
                                                        { text: `Débitos RFB: ${pgfnStatus.debitos_rfb ? 'Sim' : 'Não'}`, style: 'smallText', margin: [0, 0, 0, 0] },
                                                        { text: `IRPF: ${irpfStatus === 'DECLAROU' ? 'Declarado' : irpfStatus}`, style: 'smallText', margin: [0, 0, 0, 3] }
                                                    ]
                                                ]
                                            }]
                                        ]
                                    },
                                    margin: [0, 5, 0, 0]
                                },

                                // Address
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*'],
                                        body: [
                                            [{ text: 'ENDEREÇO PRINCIPAL', style: 'tableHeader', fillColor: '#384A39', color: 'white' }],
                                            [{
                                                text: data.basicData?.extended?.enderecos?.[0] ?
                                                    `${data.basicData.extended.enderecos[0].logradouro}, ${data.basicData.extended.enderecos[0].numero}${data.basicData.extended.enderecos[0].complemento ? ', ' + data.basicData.extended.enderecos[0].complemento : ''} - ${data.basicData.extended.enderecos[0].bairro}, ${data.basicData.extended.enderecos[0].cidade}/${data.basicData.extended.enderecos[0].uf}` :
                                                    'Endereço não disponível',
                                                style: 'smallText',
                                                margin: [0, 3, 0, 3]
                                            }]
                                        ]
                                    },
                                    margin: [0, 5, 0, 0]
                                }
                            ]
                        }
                    ]
                },

                // Footer
                {
                    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 1, lineColor: '#617A65' }],
                    margin: [0, 10, 0, 5]
                },
                {
                    columns: [
                        { image: logoDataUrl, width: 30, alignment: 'left', margin: [0, 0, 0, 0] },
                        { text: `Descobreai | Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, style: 'footer', alignment: 'right', color: '#384A39' }
                    ],
                    margin: [0, 0, 0, 0]
                }
            ],
            styles: {
                header: { fontSize: 22, bold: true, margin: [0, 0, 0, 10], color: '#384A39' },
                tableHeader: { fontSize: 13, bold: true, margin: [0, 3, 0, 3] },
                subheader: { fontSize: 17, bold: true, margin: [0, 5, 0, 3], color: '#4F6352' },
                scoreText: { fontSize: 20, bold: true, margin: [0, 3, 0, 3], color: '#4F6352' },
                riskLabel: { fontSize: 17, bold: true, margin: [0, 0, 0, 3] },
                normalText: { fontSize: 11, margin: [0, 2, 0, 2], color: '#384A39' },
                smallText: { fontSize: 10, margin: [0, 1, 0, 1], color: '#4F6352' },
                footer: { fontSize: 8, italics: true, alignment: 'right', color: '#617A65' }
            }
        };

        return new Promise((resolve) => {
            pdfMake.createPdf(docDefinition).getBuffer((buffer) => resolve(buffer));
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}


async function gerarPdf(score, data) {
    try {
        const pdf = await gerarPdfScorePdfmake(score, data);
        fs.writeFileSync('score.pdf', pdf);
        console.log('PDF gerado com sucesso: score.pdf');
    } catch (error) {
        console.error('Failed to generate PDF:', error);
    }
}

// Chame a função com o score desejado
gerarPdf(chatRiskData.media_score, data);
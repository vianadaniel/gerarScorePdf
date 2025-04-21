import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import fs from 'fs';
import { modelo1 } from './modelo.js';
import { modelo2 } from './modelo2.js';

// Correct way to assign vfs when using ES modules
pdfMake.vfs = pdfFonts;

// Create a simpler canvas
const width = 500;
const height = 300;
const chartCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour: 'white',
    devicePixelRatio: 1.5
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
                        score < 600 ? '#facc15' :
                            '#4ade80',
                    '#e5e7eb'
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
                ctx.font = 'bold 24px Arial';
                ctx.fillText(score.toString(), width / 2, height - 110);

                ctx.font = '16px Arial';
                ctx.fillText('de 1000', width / 2, height - 90);
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

const data = modelo2
const chatRiskData = JSON.parse(data.chat_risk?.return || '{}');
async function gerarPdfScorePdfmake(score, data) {
    try {
        const base64Img = await gerarGraficoBase64(score);
        const imageDataUrl = `data:image/png;base64,${base64Img}`;

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
            content: [
                { text: 'Análise de Crédito', style: 'header', alignment: 'center' },

                // Personal Information Section
                { text: 'Informações Pessoais', style: 'subheader' },
                {
                    columns: [
                        [
                            { text: `Nome: ${basicData.Name || 'N/A'}`, style: 'normalText' },
                            { text: `CPF: ${data.basicData?.extended?.cpf || 'N/A'}`, style: 'normalText' },
                            { text: `Data de Nascimento: ${data.basicData?.extended?.dataNascimento || 'N/A'}`, style: 'normalText' },
                            { text: `Idade: ${basicData.Age || 'N/A'} anos`, style: 'normalText' },
                        ],
                        [
                            { text: `Mãe: ${basicData.MotherName || 'N/A'}`, style: 'normalText' },
                            { text: `Gênero: ${data.basicData?.extended?.sexo || 'N/A'}`, style: 'normalText' },
                            { text: `Signo: ${basicData.ZodiacSign || 'N/A'}`, style: 'normalText' },
                        ]
                    ]
                },

                // Score Section
                { text: 'Pontuação de Crédito', style: 'subheader', margin: [0, 15, 0, 0] },
                {
                    columns: [
                        { width: '*', text: '' },
                        { width: 'auto', image: imageDataUrl, width: 250, alignment: "center" },
                        { width: '*', text: '' }
                    ]
                },
                { text: `Score: ${score} de 1000`, style: 'scoreText', alignment: 'center' },
                { text: `Score Boa Vista: ${boaVistaScore}`, style: 'normalText', alignment: 'center' },

                // Credit Analysis Section
                { text: 'Análise de Crédito', style: 'subheader', margin: [0, 15, 0, 0] },
                { text: `Capacidade de Pagamento: ${scoreData.capacidadePagamento || 'N/A'}`, style: 'normalText' },
                { text: `Perfil de Crédito: ${scoreData.perfil || 'N/A'}`, style: 'normalText' },

                // Financial Risk Section
                { text: 'Risco Financeiro', style: 'subheader', margin: [0, 15, 0, 0] },
                { text: `Nível de Risco: ${financialRisk.FinancialRiskLevel || 'N/A'}`, style: 'normalText' },
                { text: `Pontuação de Risco: ${financialRisk.FinancialRiskScore || 'N/A'}`, style: 'normalText' },
                { text: `Faixa de Renda Estimada: ${financialRisk.EstimatedIncomeRange || 'N/A'}`, style: 'normalText' },
                { text: `Ativos Totais: ${financialRisk.TotalAssets || 'N/A'}`, style: 'normalText' },
                { text: `Empregado Atualmente: ${financialRisk.IsCurrentlyEmployed ? 'Sim' : 'Não'}`, style: 'normalText' },

                // Legal Status Section
                { text: 'Situação Legal', style: 'subheader', margin: [0, 15, 0, 0] },
                { text: `Processos Judiciais: ${lawsuits.TotalLawsuits || 0}`, style: 'normalText' },
                { text: `Protestos: ${protestStatus === 'Não constam protestos nos cartórios participantes do Brasil' ? 'Não constam' : protestStatus}`, style: 'normalText' },
                { text: `Certidão Negativa PGFN: ${pgfnStatus.conseguiu_emitir_certidao_negativa ? 'Emitida' : 'Não Emitida'}`, style: 'normalText' },
                { text: `Débitos PGFN: ${pgfnStatus.debitos_pgfn ? 'Sim' : 'Não'}`, style: 'normalText' },
                { text: `Débitos RFB: ${pgfnStatus.debitos_rfb ? 'Sim' : 'Não'}`, style: 'normalText' },
                { text: `Certidão Negativa MTE: ${mteStatus ? 'Emitida' : 'Não Emitida'}`, style: 'normalText' },
                { text: `Situação IRPF: ${irpfStatus}`, style: 'normalText' },

                // Summary Section
                { text: 'Resumo da Análise', style: 'subheader', margin: [0, 15, 0, 0] },
                { text: chatRiskData.mensagem || 'Análise não disponível', style: 'normalText', margin: [0, 0, 0, 10] },

                // Contact Information
                { text: 'Informações de Contato', style: 'subheader', margin: [0, 15, 0, 0] },
                {
                    ul: (data.basicData?.extended?.telefones || []).map(tel =>
                        `${tel.telefoneComDDD} (${tel.operadora}) - ${tel.tipoTelefone}${tel.whatsApp ? ' - WhatsApp' : ''}`
                    )
                },

                // Address Information
                { text: 'Endereços', style: 'subheader', margin: [0, 15, 0, 0] },
                {
                    ul: (data.basicData?.extended?.enderecos || []).map(end =>
                        `${end.logradouro}, ${end.numero}${end.complemento ? ', ' + end.complemento : ''} - ${end.bairro}, ${end.cidade}/${end.uf} - CEP: ${end.cep}`
                    )
                },

                // Footer
                { text: `Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, style: 'footer', margin: [0, 30, 0, 0] }
            ],
            styles: {
                header: { fontSize: 22, bold: true, margin: [0, 0, 0, 10] },
                subheader: { fontSize: 16, bold: true, margin: [0, 5, 0, 5] },
                scoreText: { fontSize: 18, bold: true, margin: [0, 5, 0, 5] },
                normalText: { fontSize: 12, margin: [0, 2, 0, 2] },
                footer: { fontSize: 10, italics: true, alignment: 'right' }
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

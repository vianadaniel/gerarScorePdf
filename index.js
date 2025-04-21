import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import fs from 'fs';
import Chart from 'chart.js/auto';

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

async function gerarPdfScorePdfmake(score) {
    try {
        const base64Img = await gerarGraficoBase64(score);
        const imageDataUrl = `data:image/png;base64,${base64Img}`;

        const docDefinition = {
            content: [
                { text: 'Análise de Crédito', style: 'header' },
                { text: `Score: ${score} de 1000`, style: 'score' },
                { image: imageDataUrl, width: 300, alignment: "center" }
            ],
            styles: {
                header: { fontSize: 22, bold: true, margin: [0, 0, 0, 10] },
                score: { fontSize: 18, margin: [0, 0, 0, 15] }
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

async function gerarPdf(score) {
    try {
        const pdf = await gerarPdfScorePdfmake(score);
        fs.writeFileSync('score.pdf', pdf);
        console.log('PDF gerado com sucesso: score.pdf');
    } catch (error) {
        console.error('Failed to generate PDF:', error);
    }
}

// Chame a função com o score desejado
gerarPdf(750);

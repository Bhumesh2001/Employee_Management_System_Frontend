import Button from '../common/Button';
import api from '../../services/api';
import jsPDF from 'jspdf';

export default function PayslipList({ payslips }) {
    const handleDownloadPayslip = async (payslipId) => {
        try {
            const response = await api.get(`/api/payslip/my`);
            const payslips = response.data.data;

            const payslip = payslips.find(p => p._id === payslipId);
            if (!payslip) return alert('Payslip not found');

            const doc = new jsPDF();

            // Title
            doc.setFontSize(18);
            doc.text('Payslip', 20, 20);

            // Info
            doc.setFontSize(12);
            doc.text(`Employee ID: ${payslip.employeeId}`, 20, 40);
            doc.text(`Month: ${payslip.month}`, 20, 50);
            doc.text(`Amount: ₹${payslip.amount}`, 20, 60);
            doc.text(`Generated Date: ${new Date(payslip.generatedDate).toLocaleDateString()}`, 20, 70);

            // Save PDF
            doc.save(`payslip-${payslipId}.pdf`);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to download payslip');
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payslips</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left p-2">Month</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Generated Date</th>
                        <th className="text-left p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payslips.map(payslip => (
                        <tr key={payslip._id}>
                            <td className="p-2">{payslip.month}</td>
                            <td className="p-2">₹{payslip.amount}</td>
                            <td className="p-2">{new Date(payslip.generatedDate).toLocaleDateString()}</td>
                            <td className="p-2">
                                <Button
                                    onClick={() => handleDownloadPayslip(payslip._id)}
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Download
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

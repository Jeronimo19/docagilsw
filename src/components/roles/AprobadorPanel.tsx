import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";  // ← Agregado: Para clases condicionales
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardFooter } from "@/components/dashboard-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, MessageSquare, QrCode, Loader2 } from "lucide-react";  // ← Agregado Loader2
import { QRGenerator } from "@/components/qr-generator";

const sidebarItems = [
  { label: "Pendientes", href: "/aprobador", icon: "⏳" },
  { label: "Historial", href: "/aprobador/historial", icon: "📜" },
  { label: "Notificaciones", href: "/aprobador/notificaciones", icon: "🔔" },
];

// Datos hardcodeados, pero con loader simulado
const initialPendientes = [
  {
    id: "COM-202501-0001",
    creador: "Juan Pérez",
    tipo: "Solicitud de Compra",
    estado: "Pendiente",
    fecha: "2025-01-08",
    contenido: "Solicitud de compra de 10 laptops para el departamento de TI",
  },
  {
    id: "VAC-202501-0003",
    creador: "María García",
    tipo: "Vacaciones",
    estado: "Pendiente",
    fecha: "2025-01-10",
    contenido: "Solicitud de vacaciones del 15 al 30 de enero",
  },
  {
    id: "REM-202501-0005",
    creador: "Carlos López",
    tipo: "Reembolso",
    estado: "Pendiente",
    fecha: "2025-01-09",
    contenido: "Reembolso de gastos de viaje por $2,500 MXN",
  },
];

const initialHistorial = [
  {
    id: "COM-202501-0002",
    creador: "Ana Martínez",
    tipo: "Compra",
    decision: "Aprobado",
    fecha: "2025-01-07",
    qrPreliminar: "COM-202501-0002-PRELIM",
  },
  {
    id: "REM-202501-0001",
    creador: "Pedro Sánchez",
    tipo: "Reembolso",
    decision: "Aprobado",
    fecha: "2025-01-06",
    qrPreliminar: "REM-202501-0001-PRELIM",
  },
  {
    id: "VAC-202501-0002",
    creador: "Laura Gómez",
    tipo: "Vacaciones",
    decision: "Rechazado",
    fecha: "2025-01-05",
    qrPreliminar: "VAC-202501-0002-PRELIM",
  },
];

const initialBitacora = [
  { fecha: "2025-01-08 10:30", accion: "Documento creado", usuario: "Juan Pérez" },
  { fecha: "2025-01-08 11:15", accion: "Enviado a revisión", usuario: "Sistema" },
  { fecha: "2025-01-08 14:20", accion: "Asignado a aprobador", usuario: "Sistema" },
];

export default function AprobadorPanel() {
  const [currentSection, setCurrentSection] = useState("pendientes");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // ← NUEVO: Mobile sidebar
  const [comentario, setComentario] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [viewingDoc, setViewingDoc] = useState<typeof initialPendientes[0] | null>(null);
  const [pendientes, setPendientes] = useState(initialPendientes);  // ← Con setter pa' loader
  const [historial, setHistorial] = useState(initialHistorial);  // ← Con setter
  const [bitacora, setBitacora] = useState(initialBitacora);  // ← Con setter
  const [loading, setLoading] = useState(true);  // ← NUEVO: Loader
  const [error, setError] = useState<string | null>(null);

  // ← NUEVO: Fetch simulado pa' datos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));  // Simula API
        setPendientes(initialPendientes);
        setHistorial(initialHistorial);
        setBitacora(initialBitacora);
        console.log("Datos de aprobador cargados (simulado)");
      } catch (err) {
        setError("Error al cargar datos: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sectionMap: Record<string, string> = {
    "Pendientes": "pendientes",
    "Historial": "historial",
    "Notificaciones": "notificaciones",
  };

  const handleSectionChange = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    const section = sectionMap[label] || "pendientes";
    setCurrentSection(section);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);  // ← Cierra sidebar en mobile
  };

  const handleAprobar = (id: string) => {
    if (!comentario.trim()) {
      alert("Por favor agrega un comentario antes de aprobar");
      return;
    }
    alert(`Documento ${id} aprobado con comentario: ${comentario}`);
    setComentario("");
    setSelectedDoc(null);
    setViewingDoc(null);
  };

  const handleRechazar = (id: string) => {
    if (!comentario.trim()) {
      alert("Por favor agrega un comentario explicando el rechazo");
      return;
    }
    alert(`Documento ${id} rechazado con comentario: ${comentario}`);
    setComentario("");
    setSelectedDoc(null);
    setViewingDoc(null);
  };

  const handleComentar = (id: string) => {
    if (!comentario.trim()) {
      alert("Por favor escribe un comentario");
      return;
    }
    alert(`Comentario agregado al documento ${id}: ${comentario}`);
    setComentario("");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderPendientes = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-[#10B981]">
          <Clock className="h-6 w-6" />
          Documentos Pendientes de Aprobación
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="w-full overflow-x-auto">  {/* ← FIX: Responsive scroll */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Folio</TableHead>
                  <TableHead>Creador</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendientes.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.creador}</TableCell>
                    <TableCell>{doc.tipo}</TableCell>
                    <TableCell>{doc.fecha}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          setSelectedDoc(doc.id);
                          setViewingDoc(doc);
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {viewingDoc && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">{viewingDoc.tipo} - {viewingDoc.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Creador</Label>
                    <p className="text-gray-700">{viewingDoc.creador}</p>
                  </div>
                  <div>
                    <Label>Fecha</Label>
                    <p className="text-gray-700">{viewingDoc.fecha}</p>
                  </div>
                  <div>
                    <Label>Contenido</Label>
                    <p className="text-gray-700 whitespace-pre-wrap">{viewingDoc.contenido}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Comentario</Label>
                    <Textarea
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      placeholder="Agrega tu comentario..."
                      className="min-h-[80px]"
                    />
                  </div>
                  {selectedDoc === viewingDoc.id ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="flex-1 bg-[#10B981] hover:bg-[#059669]"
                        onClick={() => handleAprobar(selectedDoc)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirmar Aprobación
                      </Button>
                      <Button className="flex-1" variant="destructive" onClick={() => handleRechazar(selectedDoc)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Confirmar Rechazo
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-[#3B82F6] hover:bg-[#2563EB]"
                      onClick={() => handleComentar(viewingDoc.id)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Agregar Comentario
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderHistorial = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-[#3B82F6]">
          <QrCode className="h-6 w-6" />
          Historial de Documentos Revisados
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="w-full overflow-x-auto">  {/* ← FIX: Responsive scroll */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Folio</TableHead>
                  <TableHead>Creador</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Decisión</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>QR Preliminar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historial.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.creador}</TableCell>
                    <TableCell>{doc.tipo}</TableCell>
                    <TableCell>
                      <Badge variant={doc.decision === "Aprobado" ? "default" : "destructive"}>
                        {doc.decision}
                      </Badge>
                    </TableCell>
                    <TableCell>{doc.fecha}</TableCell>
                    <TableCell>
                      <QRGenerator value={doc.qrPreliminar} size={48} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderNotificaciones = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[#10B981]">Bitácora de Actividades</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-3">
            {bitacora.map((entry, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start gap-3 border-l-2 border-[#3B82F6] pl-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{entry.accion}</p>
                  <p className="text-sm text-gray-600">
                    {entry.usuario} - {entry.fecha}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderSection = () => {
    switch (currentSection) {
      case "pendientes":
        return renderPendientes();
      case "historial":
        return renderHistorial();
      case "notificaciones":
        return renderNotificaciones();
      default:
        return renderPendientes();
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader userName="Aprobador" role="Rol: Aprobador" onMenuToggle={toggleSidebar} /> {/* ← Agregado onMenuToggle */}
      <div className="flex flex-1">
        <DashboardSidebar 
          items={sidebarItems.map((item,) => ({
            ...item,
            onClick: (e: React.MouseEvent) => handleSectionChange(item.label, e)
          }))} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}  // ← Agregado pa' mobile
        />
        <main className={cn(  // ← Usando cn pa' responsive
          "flex-1 bg-gray-50 transition-all duration-300 p-2 sm:p-4 lg:p-6 overflow-y-auto w-full",
          isSidebarOpen ? "lg:ml-0 ml-0" : "ml-0"
        )}>
          <div className="mx-auto max-w-6xl space-y-6 w-full"> {/* ← w-full pa' expandir */}
            {renderSection()}
          </div>
        </main>
      </div>
      <DashboardFooter />
    </div>
  );
}
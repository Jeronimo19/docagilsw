import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardFooter } from "@/components/dashboard-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Settings, FileText, Database, Edit, TrendingUp, Clock, CheckCircle2, QrCode, FileText as FileTextIcon, User } from "lucide-react";

const sidebarItems = [
  { label: "Usuarios", href: "/administrador", icon: "👥" },
  { label: "Flujos", href: "/administrador", icon: "🔄" },
  { label: "KPIs Globales", href: "/administrador", icon: "📊" },
  { label: "Reportes", href: "/administrador", icon: "📄" },
  { label: "Mantenimiento", href: "/administrador", icon: "⚙️" },
];

const usuarios = [
  { id: 1, nombre: "Juan Pérez", email: "juan@empresa.com", rol: "Solicitante", estado: "Activo" },
  { id: 2, nombre: "María García", email: "maria@empresa.com", rol: "Aprobador", estado: "Activo" },
  { id: 3, nombre: "Carlos López", email: "carlos@empresa.com", rol: "Auditor", estado: "Activo" },
  { id: 4, nombre: "Ana Martínez", email: "ana@empresa.com", rol: "Solicitante", estado: "Pendiente" },
];

const etapasFlujo = [
  { numero: 1, nombre: "Iniciación", descripcion: "Creación del documento" },
  { numero: 2, nombre: "Revisión", descripcion: "Validación inicial" },
  { numero: 3, nombre: "Asignación", descripcion: "Asignación a aprobador" },
  { numero: 4, nombre: "Aprobación", descripcion: "Decisión final" },
  { numero: 5, nombre: "Auditoría", descripcion: "Revisión de cumplimiento" },
  { numero: 6, nombre: "Finalización", descripcion: "Cierre del proceso" },
];

const reportes = [
  { id: 1, titulo: "Reporte Mensual de KPIs", fecha: "2025-10-01", tipo: "PDF", estado: "Generado" },
  { id: 2, titulo: "Auditoría de Cumplimiento", fecha: "2025-09-15", tipo: "Excel", estado: "Pendiente" },
  { id: 3, titulo: "Análisis de Flujos", fecha: "2025-10-20", tipo: "CSV", estado: "Generado" },
];

export default function AdministradorPanel() {
  const [currentSection, setCurrentSection] = useState("usuarios");

  // Mapeo tipado como Record<string, string> para evitar error de indexación
  const sectionMap: Record<string, string> = {
    "Usuarios": "usuarios",
    "Flujos": "flujos",
    "KPIs Globales": "kpis",
    "Reportes": "reportes",
    "Mantenimiento": "mantenimiento",
  };

  // handleSectionChange: Asume que DashboardSidebar llama esto con el label (ajusta en sidebar si es necesario)
  const handleSectionChange = (label: string) => {
    const section = sectionMap[label] || "usuarios";
    setCurrentSection(section);
  };

  const handleApproveUser = (userId: number) => {
    alert(`Usuario ${userId} aprobado exitosamente`);
  };

  const renderUsuarios = () => (
    <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-slate-200 shadow-slate-100 duration-700">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
        <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          Gestión de Usuarios
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-4 text-lg font-semibold text-slate-700">Usuarios Pendientes de Aprobación</h3>
          <div className="space-y-3">
            {usuarios
              .filter((usuario) => usuario.estado === "Pendiente")
              .map((usuario) => (
                <div key={usuario.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{usuario.nombre}</p>
                      <p className="text-sm text-slate-500">{usuario.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-sky-100 text-sky-800">
                      {usuario.rol}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleApproveUser(usuario.id)}
                      className="bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Aprobar
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id} className="hover:bg-slate-50">
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell className="font-medium text-slate-900">{usuario.nombre}</TableCell>
                  <TableCell className="text-slate-600">{usuario.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-sky-200 text-sky-700 bg-sky-50">
                      {usuario.rol}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={usuario.estado === "Activo" ? "default" : "secondary"} className="bg-sky-100 text-sky-800">
                      {usuario.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-slate-200 hover:bg-slate-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-200 hover:bg-slate-50">
                        Ver Detalles
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const renderFlujos = () => (
    <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-sky-200 shadow-slate-100 duration-700">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          Gestión de Flujos de Trabajo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {etapasFlujo.slice(0, 3).map((etapa) => (
              <div key={etapa.numero} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white font-bold">
                  {etapa.numero}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{etapa.nombre}</h4>
                  <p className="text-sm text-slate-600">{etapa.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {etapasFlujo.slice(3).map((etapa) => (
              <div key={etapa.numero} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white font-bold">
                  {etapa.numero}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{etapa.nombre}</h4>
                  <p className="text-sm text-slate-600">{etapa.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 animate-in fade-in rounded-xl bg-gradient-to-r from-sky-50 to-slate-50 p-5 shadow-lg duration-700 delay-500 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 shadow-md">
              <QrCode className="h-5 w-5 text-white" />
            </div>
            <p className="font-semibold text-sky-700">
              Cada etapa genera un folio único y código QR para trazabilidad completa del documento
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderKPIs = () => (
    <div className="grid gap-6 md:grid-cols-4">
      {/* Primera card: Usuarios Totales con icono de usuario */}
      <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-slate-600">Usuarios Totales</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 shadow-lg transition-all group-hover:scale-110">
            <User className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-sky-600">156</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-sky-600">
            <TrendingUp className="h-3 w-3" />
            +12% este mes
          </p>
        </CardContent>
      </Card>

      <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-slate-600">Documentos Activos</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 shadow-lg transition-all group-hover:scale-110">
            <FileText className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-sky-600">247</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-sky-600">
            <TrendingUp className="h-3 w-3" />
            +28% este mes
          </p>
        </CardContent>
      </Card>

      <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-slate-600">Tiempo Promedio de Procesamiento</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 shadow-lg transition-all group-hover:scale-110">
            <Clock className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-sky-600">2.1 días</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-sky-600">
            <TrendingUp className="h-3 w-3" />
            -8% este mes
          </p>
        </CardContent>
      </Card>

      <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-slate-600">Tasa de Cumplimiento</CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 shadow-lg transition-all group-hover:scale-110">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-sky-600">98.5%</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-sky-600">
            <TrendingUp className="h-3 w-3" />
            +2% este mes
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportes = () => (
    <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-slate-200 shadow-slate-100 duration-700">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
        <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
          <FileTextIcon className="h-6 w-6" />
          Gestión de Reportes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportes.map((reporte) => (
              <TableRow key={reporte.id} className="hover:bg-slate-50">
                <TableCell>{reporte.id}</TableCell>
                <TableCell className="font-medium text-slate-900">{reporte.titulo}</TableCell>
                <TableCell>{reporte.fecha}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                    {reporte.tipo}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={reporte.estado === "Generado" ? "default" : "secondary"} className="bg-sky-100 text-sky-800">
                    {reporte.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" className="border-slate-200 hover:bg-slate-50">
                    Descargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderMantenimiento = () => (
    <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-slate-200 shadow-slate-100 duration-700">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
        <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 shadow-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          Mantenimiento del Sistema
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Button className="group h-20 bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
            <Database className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
            <span className="text-lg font-semibold text-white">Crear Backup</span>
          </Button>
          <Button className="group h-20 bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
            <Settings className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
            <span className="text-lg font-semibold text-white">Configurar Notificaciones</span>
          </Button>
          <Button className="group h-20 bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
            <FileText className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
            <span className="text-lg font-semibold text-white">Ver Logs del Sistema</span>
          </Button>
          <Button className="group h-20 bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
            <Settings className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
            <span className="text-lg font-semibold text-white">Integración ERP</span>
          </Button>
        </div>
        <div className="animate-in fade-in rounded-xl bg-gradient-to-r from-sky-50 to-slate-50 p-5 shadow-lg duration-700 delay-500 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 shadow-md">
              <CheckCircle2 className="h-5 w-5 animate-pulse text-white" />
            </div>
            <div>
              <p className="font-semibold text-sky-700">Sistema Operando Normalmente</p>
              <p className="text-sm text-slate-600">
                Último backup: 2025-10-29 12:00 PM | Integraciones activas: 3
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSection = () => {
    switch (currentSection) {
      case "usuarios":
        return renderUsuarios();
      case "flujos":
        return renderFlujos();
      case "kpis":
        return renderKPIs();
      case "reportes":
        return renderReportes();
      case "mantenimiento":
        return renderMantenimiento();
      default:
        return renderUsuarios();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-sky-50/20">
      <DashboardHeader userName="Administrador" role="Rol: Administrador" />
      <div className="flex flex-1">
        {/* Pasa handleSectionChange a través de items para evitar prop no existente */}
        <DashboardSidebar 
          items={sidebarItems.map(item => ({
            ...item,
            onClick: () => handleSectionChange(item.label)  // Agrega onClick por ítem
          }))} 
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto max-w-7xl space-y-6">
            {renderSection()}
          </div>
        </main>
      </div>
      <DashboardFooter />
    </div>
  );
}
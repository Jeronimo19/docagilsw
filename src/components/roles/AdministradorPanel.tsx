import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardFooter } from "@/components/dashboard-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, FileText, Database, Edit, TrendingUp, Clock, CheckCircle2, QrCode } from "lucide-react";

const sidebarItems = [
  { label: "Usuarios", href: "/administrador", icon: "👥" },
  { label: "Flujos", href: "/administrador/flujos", icon: "🔄" },
  { label: "KPIs Globales", href: "/administrador/kpis", icon: "📊" },
  { label: "Reportes", href: "/administrador/reportes", icon: "📄" },
  { label: "Mantenimiento", href: "/administrador/mantenimiento", icon: "⚙️" },
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

export default function AdministradorPanel() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [editingFlow, setEditingFlow] = useState(false);

  const handleApproveUser = (userId: number) => {
    alert(`Usuario ${userId} aprobado exitosamente`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      <DashboardHeader userName="Administrador" role="Rol: Administrador" />
      <div className="flex flex-1">
        <DashboardSidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Usuarios Totales</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shadow-lg transition-all group-hover:scale-110">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">156</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +12% este mes
                  </p>
                </CardContent>
              </Card>

              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Documentos Activos</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] shadow-lg transition-all group-hover:scale-110">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">247</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +28% este mes
                  </p>
                </CardContent>
              </Card>

              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Tiempo Promedio de Procesamiento</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 shadow-lg transition-all group-hover:scale-110">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">2.1 días</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    -8% este mes
                  </p>
                </CardContent>
              </Card>

              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Tasa de Cumplimiento</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 shadow-lg transition-all group-hover:scale-110">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">98.5%</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +2% este mes
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-gray-200 shadow-2xl duration-700">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="text-2xl text-[#10B981]">Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
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
                    {usuarios.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">{user.nombre}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.rol}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.estado === "Activo" ? "default" : "secondary"}>
                            {user.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.estado === "Pendiente" ? (
                            <Button size="sm" onClick={() => handleApproveUser(user.id)}>
                              Aprobar Usuario
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              Ver Perfil
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-blue-200 shadow-2xl duration-700 delay-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-[#3B82F6]">
                  <Edit className="h-6 w-6" />
                  Configuración de Flujos de Trabajo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {etapasFlujo.map((etapa, index) => (
                    <Card key={etapa.numero} className="group hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white font-bold">
                            {etapa.numero}
                          </div>
                          <CardTitle className="text-lg font-semibold">{etapa.nombre}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{etapa.descripcion}</p>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-blue-100 text-blue-800">Duración: 1-3 días</Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                              <QrCode className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 animate-in fade-in rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow-lg duration-700 delay-500">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] shadow-md">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-semibold text-[#10B981]">
                      Cada etapa genera un folio único y código QR para trazabilidad completa del documento
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-gray-200 shadow-2xl duration-700 delay-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-[#10B981]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-700 shadow-lg">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  Mantenimiento del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button className="group h-20 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <Database className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Crear Backup</span>
                  </Button>
                  <Button className="group h-20 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <Settings className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Configurar Notificaciones</span>
                  </Button>
                  <Button className="group h-20 bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <FileText className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Ver Logs del Sistema</span>
                  </Button>
                  <Button className="group h-20 bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <Settings className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Integración ERP</span>
                  </Button>
                </div>
                <div className="animate-in fade-in rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-5 shadow-lg duration-700 delay-500">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shadow-md">
                      <CheckCircle2 className="h-5 w-5 animate-pulse text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3B82F6]">Sistema Operando Normalmente</p>
                      <p className="text-sm text-blue-700">
                        Último backup: 2025-01-10 03:00 AM | Integraciones activas: 3
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <DashboardFooter />
    </div>
  );
}
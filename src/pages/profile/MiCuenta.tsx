import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Pa' back suave al dashboard
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, ArrowLeft } from "lucide-react";
import { DashboardFooter } from "@/components/dashboard-footer";

export default function MiCuenta() {
  const [userName, setUserName] = useState("Juan Pérez");
  const [userRole] = useState("Solicitante");  // ← Puedes hacerlo dinámico con localStorage si querés
  const [email, setEmail] = useState("juan.perez@empresa.com");
  const [department, setDepartment] = useState("Recursos Humanos");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const activityHistory = [
    { date: "2025-01-10", action: "Creó trámite", documentId: "DOC-2025-001" },
    { date: "2025-01-09", action: "Actualizó perfil", documentId: "-" },
    { date: "2025-01-08", action: "Descargó reporte", documentId: "REP-2025-045" },
    { date: "2025-01-07", action: "Creó trámite", documentId: "DOC-2025-002" },
    { date: "2025-01-06", action: "Consultó documento", documentId: "DOC-2025-003" },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("Perfil actualizado correctamente");
  };

  const handleChangePassword = () => {
    alert("Se ha enviado un enlace de cambio de contraseña a tu email");
  };

  const handleBackToDashboard = () => {
    navigate(`/${userRole.toLowerCase()}`);  // ← Va al panel del rol (ej. /solicitante)
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-400">  {/* ← CAMBIO: bg-slate-50 (gris claro para fondo) */}
      <header className="relative border-b border-sky-200/30 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 px-6 py-6 shadow-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Hola, {userName} (Rol: {userRole})
              </h1>
              <p className="mt-1 text-sm text-white/90">Gestiona tu información personal y actividad</p>
            </div>
            <Button
              variant="outline"
              className="gap-2 border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <Card className="shadow-slate-100 transition-shadow hover:shadow-slate-200 border-slate-200 bg-white">  {/* ← CAMBIO: bg-white explícito para contrastar con fondo gris */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-700">
                <User className="h-6 w-6" />
                Datos Personales
              </CardTitle>
              <CardDescription className="text-slate-600">Administra tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-70 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-70 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-slate-700">Departamento</Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-70 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-700">Rol</Label>
                  <Input id="role" value={userRole} disabled className="opacity-70 border-slate-300" />
                </div>
              </div>

              <div className="flex gap-3">
                {!isEditing ? (
                  <>
                    <Button className="gap-2 bg-sky-500 hover:bg-sky-600 text-white" onClick={() => setIsEditing(true)}>
                      Editar Perfil
                    </Button>
                    <Button className="gap-2 bg-sky-500 hover:bg-sky-600 text-white" onClick={handleChangePassword}>
                      Cambiar Contraseña
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="gap-2 bg-sky-500 hover:bg-sky-600 text-white" onClick={handleSaveProfile}>
                      Guardar Cambios
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-slate-100 transition-shadow hover:shadow-slate-200 border-slate-200 bg-white">  {/* ← CAMBIO: bg-white para contrastar */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-700">
                <FileText className="h-6 w-6" />
                Historial de Actividad
              </CardTitle>
              <CardDescription className="text-slate-600">Últimas acciones realizadas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Fecha</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Acción</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Documento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityHistory.map((activity, index) => (
                      <tr key={index} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-600">{activity.date}</td>
                        <td className="px-4 py-3 text-sm text-slate-900">{activity.action}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{activity.documentId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">Mostrando 5 actividades recientes</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sky-500 hover:bg-sky-50 border-slate-300"
                >
                  Ver Todo el Historial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
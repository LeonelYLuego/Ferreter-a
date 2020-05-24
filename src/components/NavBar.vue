<template>
    <div id="NavBar">
        <b-navbar toggleable="lg" type="dark" id="navbar">
            <b-navbar-brand to="/">Ferretería del Parque</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/products">Productos</b-nav-item>
                    <b-nav-item href="#" disabled>Clientes</b-nav-item>
                    <b-nav-item to="/providers">Proveedores</b-nav-item>
                    <b-nav-item-dropdown text="Otros" disabled>
                        <b-nav-item href="#" disabled>Clasificaciones</b-nav-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style scoped>
#navbar{
    background-color: rgb(0, 0, 0);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}
</style>
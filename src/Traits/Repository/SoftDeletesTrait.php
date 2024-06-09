<?php
/**
 * Project Alca API
 *
 * @author Ünal Aydin <aydin@mavimedia.com.com>
 * @copyright Ünal Aydin
 * @version 1.0
 * @package App\Entity
 */

namespace App\Traits\Repository;

trait SoftDeletesTrait
{

    public function activateSoftDeletesFilter() {
        $this->getEntityManager()->getFilters()->enable('softdeleteable');
        return $this;
    }

    public function deactivateSoftDeletesFilter() {
        $this->getEntityManager()->getFilters()->disable('softdeleteable');
        return $this;
    }

    public function softDeletesFilter($active = true) {
        if ( !$active ) {
            $this->getEntityManager()->getFilters()->disable('softdeleteable');
        }
        return $this;
    }

}
